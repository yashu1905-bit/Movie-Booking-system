require('dotenv').config();

const appConfig = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/moviebooking',
  jwtSecret: process.env.JWT_SECRET || 'super_secret',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'refresh_secret',
  appName: process.env.APP_NAME || 'Neon Theatre',
  razorpayKeyId: process.env.RAZORPAY_KEY_ID || 'dummy_key_id',
  razorpayKeySecret: process.env.RAZORPAY_KEY_SECRET || 'dummy_key_secret',
  smtpHost: process.env.SMTP_HOST || 'smtp.mailtrap.io',
  smtpPort: process.env.SMTP_PORT || 2525,
  smtpUser: process.env.SMTP_USER || 'your_smtp_user',
  smtpPass: process.env.SMTP_PASS || 'your_smtp_password',
};

module.exports = appConfig;
