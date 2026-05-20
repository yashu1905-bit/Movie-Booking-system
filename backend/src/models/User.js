const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  password: { type: String, required: true },
  avatar: { type: String }, // Custom Profile Picture URL
  refreshToken: { type: String }, // Used to rotate short-lived JWTs
  isVerified: { type: Boolean, default: false },
  otp: { type: String, select: false },
  otpExpires: { type: Date, select: false }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
