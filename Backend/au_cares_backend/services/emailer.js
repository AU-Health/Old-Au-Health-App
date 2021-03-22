const nodemailer = require("nodemailer");
class emailer {
    //function to send email to someone
    static sendEmail(emailTo, subject, bodyHTML) {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.emailAccount,
                pass: process.env.emailPassword
            }
        })

        var mailOptions = {
            from: process.env.emailAccount,
            to: emailTo,
            subject: subject,
            html: bodyHTML
        };

        return transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}