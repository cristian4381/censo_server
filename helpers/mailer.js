const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host : 'smtp.gmail.com',
    port : 587,
    auth: {
      user: 'tutoapps12@gmail.com',
      pass: '|@ncer104224*',
    }
})

module.exports = transporter;