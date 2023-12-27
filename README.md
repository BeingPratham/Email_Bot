<h1>🎉Email Bot with Node.js and Google Gmail API🎉</h1>
<hr>
<h3>INTRODUCTION</h3>
<p>Welcome to the Email Bot! It's a Node.js application that uses the Google Gmail API to make email handling a breeze. This bot is lightweight, yet it gets the job done efficiently. It automatically responds to your emails, personalizing the replies and keeping your inbox tidy.</p>
<hr>
<h3>Libraries</h3>
<p>googleapis:- The googleapis package is the official JavaScript library for interacting with various Google APIs, including the Gmail API. It simplifies the integration of Google services into your applications and provides convenient methods for making API requests.</p>
<hr>
<h3>FEATURES</h3>
<p>1) This app checks for new emails in a given Gmail ID.</p>
<p>2) This app replies to email that have no prior replies.</p>
<p>3) This app adds the label to the emails and move that mail to that label.</p>
<p>4) This app repeats this sequence of steps 1-3 in random intervals of 45 to 120 seconds.</p>
<p>5) This app also handles double replies problem, if the email is already replied then it won't reply again.</p>
<hr>
<h3>GETTING STARTED</h3>
<p>We first need to setup the Google cloud console. It requires several steps:- </p>
<h4>STEP 1:- CREATING THE PROJECT</h4>
<P>1. Go to <a href="https://console.cloud.google.com/">Google Cloud Console</a></P>
<P>2. Click on the project drop-down menu at the top and select "New Project."</P>
<P>3. Give your project a name, and click "Create."</P>
<h4>STEP 2:- ENABLE THE GMAIL API</h4>
<p>1. In the left navigation, click on "APIs & Services" > "Dashboard."</p>
<p>2. Click on "+ ENABLE APIS AND SERVICES" at the top.</p>
<p>3. Search for "Gmail API" and select it.</p>
<p>4. Enable it.</p>
<h4>STEP 3:- CREATE CREDENTIALS</h4>
<p>1. In the left navigation, click on "APIs & Services" > "Credentials."</p>
<p>2. Click on "+ CREATE CREDENTIALS" and choose "OAuth client ID."</p>
<p>3. Configure the consent screen by entering a name for your application.</p>
<p>4. Select "Web Application" as the application type.</p>
<p>5. Click "Create" to generate your OAuth client ID.</p>
<p>6. Download your credentials as a JSON file. This file will contain your client ID, client secret, and other information</p>
<h4>STEP 4:- SetUp OAuth Consent Screen</h4>
<p>1. In the "Credentials" page, click on the "OAuth consent screen" tab.</p>
<p>2. Fill out the necessary information, including the application's name and support email.</p>
<p>3. Save your changes.</p>
<h4>STEP 5:- Configure your OAuth Consent Screen</h4>
<p>1. Go to the "Credentials" page.</p>
<p>2. Click on your OAuth client ID.</p>
<p>3. Add the authorized redirect URI. For a Node.js application.</p>
<hr>
<h3>RUN THE SCRIPT</h3>
<p>1. git clone git@github.com:BeingPratham/Email_Bot.git</p>
<p>2. npm install</p>
<p>3. node index.js (Make sure you are in that directory)</p>
