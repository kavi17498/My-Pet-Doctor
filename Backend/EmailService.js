const nodemailer = require('nodemailer');

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '', // Replace with your email
    pass: ''     // Replace with your App Password
  }
});

const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: 'kavindulakshan187@gmail.com',
    to,
    subject,
    text
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
