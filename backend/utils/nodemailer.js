const nodemailer = require("nodemailer");

const sendEmail = async (user, message) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: user.username,  // assuming email is username
    subject: "XExit Notification",
    text: message
  });
};

module.exports = sendEmail;
