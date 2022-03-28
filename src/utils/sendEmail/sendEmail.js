const nodemailer = require("nodemailer");

async function SendEmail({ email, token, expiry }) {
    const smtpTransport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        auth: {
            user: process.env.EMAIL_ID,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    const mailOptions = {
        to: email,
        from: "officialimmersis@gmail.com",
        subject: "Immersis Password Reset",
        text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
            Please click on the following link, or paste this into your browser to complete the process:\n\n
            http://${process.env.FRONT_SITE}/reset?token=${token}&expiry=${expiry}
            \n\nThis link is valid for 1 hour.
            \n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`
    };
    await smtpTransport.sendMail(mailOptions);
}

exports.SendEmail = SendEmail;
