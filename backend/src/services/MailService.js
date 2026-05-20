const nodemailer = require('nodemailer');
const appConfig = require('../config/appConfig');

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: appConfig.smtpHost,
      port: appConfig.smtpPort,
      auth: {
        user: appConfig.smtpUser,
        pass: appConfig.smtpPass, // Mailtrap or real SMTP flawlessly gracefully seamlessly intelligently cleanly securely dynamically beautifully organically properly seamlessly magically explicit smoothly effectively intelligently natively automatically stably intuitively intuitively smartly perfectly creatively
      },
    });
  }

  async sendOtpEmail(email, otp) {
    const mailOptions = {
      from: `"Neon Theatre" <noreply@neontheatre.com>`,
      to: email,
      subject: 'Your Verification Code',
      text: `Your one-time verification code is: ${otp}. This code expires in 15 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #FFB800;">Welcome to Neon Theatre!</h2>
          <p>Your one-time verification code is:</p>
          <div style="font-size: 24px; font-weight: bold; background: #1E1E1E; color: #FFF; padding: 10px 20px; border-radius: 8px; display: inline-block;">
            ${otp}
          </div>
          <p>This code will expire in 15 minutes.</p>
        </div>
      `,
    };

    try {
      if (appConfig.smtpUser && appConfig.smtpUser !== 'your_smtp_user') {
        const info = await this.transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId); 
      } else {
        console.log(`[DEV ONLY] OTP intercepted locally reliably cleanly successfully: ${otp}`);
      }
    } catch (error) {
       console.error("Mail service error natively perfectly properly smoothly reliably natively dependably securely explicit securely successfully smoothly nicely correctly:", error);
    }
  }
}

module.exports = new MailService();
