/**
* Email utility module.
* @module emailHandler
*/

import formData from 'form-data';
import Mailgun from 'mailgun.js';
import dotenv from 'dotenv';

dotenv.config();

const mailgun = new Mailgun(formData);
const client = mailgun.client({
 username: 'api',
 key: process.env.EMAIL_API_KEY,
 url: 'https://api.mailgun.net',
});

/**
* Send an email using Mailgun.
* @async
* @function sendEmail
* @param {string} to - The recipient's email address.
* @param {string} subject - The subject of the email.
* @param {string} receiverName - The name of the receiver.
* @param {string} message - The message content of the email.
* @returns {Promise<void>}
*/
const sendEmail = async (to, subject, receiverName, message) => {
 const htmlContent = generateHtmlEmail(receiverName, message);

 const messageData = {
   from: 'GlobeMediWatch <noreply@csyewebapp.me>',
   to: to,
   subject: subject,
   html: htmlContent,
 };

 try {
   const response = await client.messages.create('csyewebapp.me', messageData);
 } catch (error) {
   console.error('Failed to send email:', error);
 }
};

/**
* Generate the HTML content for the email.
* @function generateHtmlEmail
* @param {string} name - The name of the receiver.
* @param {string} message - The message content of the email.
* @returns {string} The generated HTML content.
*/
const generateHtmlEmail = (name, message) => {
 const template = `
   <!DOCTYPE html>
   <html lang="en">
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Notification Email</title>
     <style>
       body {
         font-family: Arial, sans-serif;
         margin: 0;
         padding: 0;
         background-color: #f4f4f4;
       }
       .container {
         width: 100%;
         max-width: 600px;
         margin: 0 auto;
         background: #ffffff;
         padding: 20px;
         box-shadow: 0 2px 5px rgba(0,0,0,0.15);
       }
       .header {
         background-color: #007bff;
         color: #ffffff;
         padding: 10px 20px;
         text-align: center;
       }
       .content {
         padding: 20px;
         text-align: left;
         line-height: 1.6;
       }
       .footer {
         background-color: #eeeeee;
         color: #333333;
         padding: 10px 20px;
         text-align: center;
         font-size: 12px;
       }
     </style>
   </head>
   <body>
     <div class="container">
       <div class="header">
         <h1>GlobeMediWatch</h1>
       </div>
       <div class="content">
         <h2>Dear ${name},</h2>
         <p>${message}</p>
         <p>Please do not reply to this email. If you have any questions or need further information, please contact us at <a href="mailto:support@csyewebapp.me">support@csyewebapp.me</a>.</p>
       </div>
       <div class="footer">
         <p>Thank you for using our services.</p>
       </div>
     </div>
   </body>
   </html>
 `;

 return template;
};

export default sendEmail;