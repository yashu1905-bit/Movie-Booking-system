const mongoose = require('mongoose');
const appConfig = require('../config/appConfig');

const settingSchema = new mongoose.Schema({
  platformName: { type: String, default: appConfig.appName },
  logoUrl: { type: String, default: '' },
  supportEmail: { type: String, default: 'support@moviebooking.com' },
  contactPhone: { type: String, default: '+1 (555) 123-4567' },
  stripePublicKey: { type: String, default: 'pk_test_12345' },
  stripeSecretKey: { type: String, default: 'sk_test_12345' },
  stripeEnabled: { type: Boolean, default: true },
  razorpayKeyId: { type: String, default: 'rzp_test_12345' },
  razorpayKeySecret: { type: String, default: 'rzps_test_12345' },
  razorpayEnabled: { type: Boolean, default: false }
}, {
  timestamps: true
});

const Setting = mongoose.model('Setting', settingSchema);
module.exports = Setting;
