// import nodemailer (after npm install nodemailer)
const nodemailer = require('nodemailer');

// config for mailserver and mail, input your data
const config = {
  mailserver: {
    host: '',
    port: 587,
    secure: false,
    auth: {
      user: '729c9d3d03791a',
      pass: '656db6add69b88'
    }
  },
 mail: {
    from: 'Administrator@OhioCyberRangeInstitute.org',
    to: 'CTFplayer1@example.com',
    subject: 'Registration Successful - Welcome to the Ohio Cyber Range Capture the Flag!',
    text: 'Welcome! Here are some tips to get you started with Capture the Flag (CTF).'
  }
};

const sendMail = async ({ mailserver, mail }) => {
  // create a nodemailer transporter using smtp
  let transporter = nodemailer.createTransport(mailserver);

  // send mail using transporter
  let info = await transporter.sendMail(mail);

  console.log(`Preview: ${nodemailer.getTestMessageUrl(info)}`);
};

sendMail(config).catch(console.error);