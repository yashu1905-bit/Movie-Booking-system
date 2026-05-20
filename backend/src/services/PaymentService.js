const razorpay = require('../config/razorpay');
const crypto = require('crypto');
const BookingRepository = require('../repositories/BookingRepository');
const Booking = require('../models/Booking');
const bookingRepo = new BookingRepository(Booking);

class PaymentService {
  async createOrder(bookingId, userId) {
    const booking = await bookingRepo.findById(bookingId);
    if (!booking) {
      const error = new Error('Booking not found across the ledger.');
      error.statusCode = 404;
      throw error;
    }
    if (booking.userId.toString() !== userId) {
      const error = new Error('Unauthorized restrictions extracting transaction hashes mapping origin user constraints natively.');
      error.statusCode = 403;
      throw error;
    }
    if (booking.paymentStatus === 'completed') {
      const error = new Error('Invalid Action: Billing limits finalized tracking explicit payments natively securely.');
      error.statusCode = 400;
      throw error;
    }

    const amountInPaise = Math.round(booking.totalAmount * 100);

    const options = {
      amount: amountInPaise,
      currency: 'INR',
      receipt: `rcpt_node_${booking._id}`,
    };

    const order = await razorpay.orders.create(options);
    return order;
  }

  async verifyPayment(razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId, userId) {
    const secret = process.env.RAZORPAY_KEY_SECRET || 'dummy_key_secret';

    const generated_signature = crypto
      .createHmac('sha256', secret)
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex');

    if (generated_signature !== razorpay_signature) {
      const booking = await bookingRepo.findById(bookingId);
      if (booking) {
         booking.paymentStatus = 'failed';
         await booking.save();
      }
      const error = new Error('Cryptographic anomaly limits detected mapping secure boundaries limits');
      error.statusCode = 400;
      throw error;
    }

    const booking = await bookingRepo.findById(bookingId);
    if (!booking) {
      const error = new Error('Booking lookup dynamically excluded mapping secure validation constraints natively');
      error.statusCode = 404;
      throw error;
    }
    if (booking.userId.toString() !== userId) {
      const error = new Error('Unauthorized user accessing validation ledger limits');
      error.statusCode = 403;
      throw error;
    }

    booking.paymentStatus = 'completed';
    await booking.save();

    return booking;
  }
}

module.exports = new PaymentService();
