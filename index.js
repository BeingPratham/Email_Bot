const { google } = require("googleapis");
const {
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
  REFRESH_TOKEN,
} = require("./credentials");
//OAuth2 module allow to retrive an access token, refresh it and retry the request.
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });


const repliedUsers = new Set();//Using set for handling duplicates, we don't want to reply to same emails again and again

//Step 1. check for new emails and sends replies .
async function checkEmailsAndSendReplies() {
  try {
    const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

    // Get the list of unread messages.
    const res = await gmail.users.messages.list({
      userId: "me",
      q: "is:unread",
    });
    const messages = res.data.messages;

    if (messages && messages.length > 0) {
      // Fetch the complete message details.
      for (const message of messages) {
        const email = await gmail.users.messages.get({
          userId: "me",
          id: message.id,
        });
        const from = email.data.payload.headers.find(
          (header) => header.name === "From"
        );
        const toHeader = email.data.payload.headers.find(
          (header) => header.name === "To"
        );
        const Subject = email.data.payload.headers.find(
          (header) => header.name === "Subject"
        );
        //who sends email extracted
        const From = from.value;
        //who gets email extracted
        const toEmail = toHeader.value;
        //subject of unread email
        const subject = Subject.value;
        console.log("Email From:- ", From);
        console.log("To Email:- ", toEmail);
        //check if the user already been replied to
        if (repliedUsers.has(From)) {
          console.log("Already replied to:-  ", From);
          continue;
        }
        // 2.send replies to Emails that have no prior replies
        // Check if the email has any replies.
        const thread = await gmail.users.threads.get({
          userId: "me",
          id: message.threadId,
        });
        const replies = thread.data.messages.slice(1);

        if (replies.length === 0) {
          // Reply to the email.
          await gmail.users.messages.send({
            userId: "me",
            requestBody: {
              raw: await createReplyRaw(toEmail, From, subject),
            },
          });

          // Add a label to the email.
          const labelName = "Testing";
          await gmail.users.messages.modify({
            userId: "me",
            id: message.id,
            requestBody: {
              addLabelIds: [await createLabelIfNeeded(labelName)],
            },
          });

          console.log("Sent reply to email:- ", From);
          //Add the user to replied users set
          repliedUsers.add(From);
        }
      }
    }
  } catch (error) {
    console.error("Error occurred:- ", error);
  }
}

async function createReplyRaw(from, to, subject) {
  try {
    const emailContent = `From: ${from}\nTo: ${to}\nSubject: ${subject}\n\nThanks for reaching out...This is auto generated email. `;
    const base64EncodedEmail = Buffer.from(emailContent)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

    return base64EncodedEmail;
  } catch (error) {
    if (error.response) {
      console.error("Server responded with an error:", error.response.data);
    } else if (error.request) {
      console.error("No response received from the server.");
    } else {
      console.error("Error setting up the request:", error.message);
    }
  }
}

// 3.add a Label to the email and move the email to the label
async function createLabelIfNeeded(labelName) {
  try {
    const gmail = google.gmail({ version: "v1", auth: oAuth2Client });
    const res = await gmail.users.labels.list({ userId: "me" });
    const labels = res.data.labels;

    const existingLabel = labels.find((label) => label.name === labelName);
    if (existingLabel) {
      return existingLabel.id;
    }

    // Create the label if it doesn't exist.
    const newLabel = await gmail.users.labels.create({
      userId: "me",
      requestBody: {
        name: labelName,
        labelListVisibility: "labelShow",
        messageListVisibility: "show",
      },
    });

    return newLabel.data.id;
  } catch (error) {
    if (error.response) {
      console.error("Server responded with an error:", error.response.data);
    } else if (error.request) {
      console.error("No response received from the server.");
    } else {
      console.error("Error setting up the request:", error.message);
    }
  }
}

/*4.repeat this sequence of steps 1-3 in random intervals of 45 to 120 seconds*/
function getRandomInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//Setting Interval and calling main function in every interval
setInterval(checkEmailsAndSendReplies, getRandomInterval(45, 120) * 1000);

/*note on areas where your code can be improved.
    1) Dynamic Content:- Here we can create an ui from which we can send dynamic messages to specific type of mails.
    2) Avoid spams:- We can improve our mechanism so that it cannot reply to spam emails and other advertisment emails.
    3) Accuracy:- We can increase the accuracy to detect which email is spam or ad.
    4) Dynamic Labels:- We can improve providing dynamic labels according to the content of the email.
  */
