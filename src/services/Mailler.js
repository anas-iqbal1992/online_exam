var nodemailer = require('nodemailer');
const Mailer  = (savedUser,emailTemplate) => {
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_EMAIL_PASSWORD
  }
});

var mailOptions = {
  from: process.env.ADMIN_EMAIL,
  to: savedUser.email,
  subject: 'Registration Mail',
  html: emailTemplate       
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
}
module.exports = Mailer;