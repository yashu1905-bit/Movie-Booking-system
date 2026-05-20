const Razorpay = require('razorpay');
const appConfig = require('./appConfig');

const instance = new Razorpay({
  key_id: appConfig.razorpayKeyId,
  key_secret: appConfig.razorpayKeySecret,
});

module.exports = instance;
