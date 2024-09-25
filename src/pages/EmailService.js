const nodemailer = require('nodemailer');

// Set up the transporter with the bihita6138@exweme.com email
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can change this based on the email provider
  auth: {
    user: 'bihita6138@exweme.com', // Your no-reply email
    pass: 'random123', // Use the password or app-specific password for this email
  },
});

// Function to send tracking email
const sendTrackingEmail = (recipientEmail, trackingNumber) => {
  const mailOptions = {
    from: '"No-Reply Repair Service" <bihita6138@exweme.com>', // Sender address
    to: recipientEmail, // Receiver address
    subject: 'Your Repair Tracking Number',
    text: `Thank you for your repair order. Your tracking number is: ${trackingNumber}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

module.exports = { sendTrackingEmail };