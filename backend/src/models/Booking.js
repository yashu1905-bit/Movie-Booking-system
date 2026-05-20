const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  showId: { type: mongoose.Schema.Types.ObjectId, ref: 'Show', required: true },
  seats: [{ type: String, required: true }],
  totalAmount: { type: Number, required: true },
  originalAmount: { type: Number },
  discountCode: { type: String, default: null },
  paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'], default: 'completed' },
  status: { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
