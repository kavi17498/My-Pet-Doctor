const nodemailer = require('nodemailer');

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kavindulakshan187@gmail.com', // Replace with your email
    pass: 'lhnp xgye pkpf ruul'     // Replace with your App Password
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
