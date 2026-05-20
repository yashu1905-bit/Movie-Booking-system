const mongoose = require('mongoose');

const showSeatSchema = new mongoose.Schema({
  show: { type: mongoose.Schema.Types.ObjectId, ref: 'Show', required: true },
  seatNumber: { type: String, required: true },
  status: { type: String, enum: ['available', 'locked', 'booked'], default: 'available' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  lockedUntil: { type: Date }
}, { timestamps: true });

showSeatSchema.index({ show: 1, seatNumber: 1 }, { unique: true });

module.exports = mongoose.model('ShowSeat', showSeatSchema);
