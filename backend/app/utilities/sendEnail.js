// utils/sendEmail.js
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY); // Set this in your environment configuration

export const sendEmail = async ({ to, subject, text, html }) => {
  const msg = {
    to,
    from: 'your-email@example.com', // Use the email address verified with SendGrid
    subject,
    text,
    html,
  };

  try {
    await sgMail.send(msg);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Email not sent:', error);
    throw new Error('Failed to send email');
  }
};
