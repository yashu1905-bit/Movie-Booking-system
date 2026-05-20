const mongoose = require('mongoose');

const discountSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, 'Please provide a discount code'],
    unique: true,
    trim: true,
    uppercase: true,
  },
  discountType: {
    type: String,
    enum: ['percentage', 'fixed'],
    required: [true, 'Discount type must be percentage or fixed'],
  },
  value: {
    type: Number,
    required: [true, 'Please specify the discount value'],
    min: [0, 'Discount value cannot be negative'],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  expiresAt: {
    type: Date,
  },
  maxUses: {
    type: Number, // Optional: if provided, limits total usages globally
    default: null,
  },
  currentUses: {
    type: Number,
    default: 0,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Discount', discountSchema);
