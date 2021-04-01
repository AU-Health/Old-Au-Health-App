const nodemailer = require("nodemailer");

async function sendEmail(emailTo, subject, bodyHTML) {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            // type: 'OAuth2',
            user: process.env.emailAccount,
            pass: process.env.emailPassword
        }
    })

    let sendingInfo = await transporter.sendMail({
        from: `"${process.env.emailSenderName}" <${process.env.emailAccount}>`,
        to: emailTo,
        subject: subject,
        html: bodyHTML,
    });

    console.log("WITH INFO!!!");
    console.log(sendingInfo);
}

module.exports.sendEmail = sendEmail;