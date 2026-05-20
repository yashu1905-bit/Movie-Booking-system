const User = require('../models/User');

class UserRepository {
  async create(userData) {
    const user = new User(userData);
    return await user.save();
  }

  async findByEmail(email) {
    return await User.findOne({ email });
  }

  async findByEmailWithOtp(email) {
    return await User.findOne({ email }).select('+otp +otpExpires +password');
  }

  async saveUser(user) {
    return await user.save();
  }

  async findById(id) {
    // Excluding password payload to protect accidental PII leaks during queries
    return await User.findById(id).select('-password');
  }

  async findByIdFull(id) {
    // Required securely when internal hashing mechanisms explicitly demand password comparison mappings
    return await User.findById(id);
  }

  async updateRefreshToken(userId, token) {
    return await User.findByIdAndUpdate(userId, { refreshToken: token }, { returnDocument: 'after' });
  }
  
  async removeRefreshToken(userId) {
    return await User.findByIdAndUpdate(userId, { $unset: { refreshToken: 1 } }, { returnDocument: 'after' });
  }
}

module.exports = new UserRepository();
