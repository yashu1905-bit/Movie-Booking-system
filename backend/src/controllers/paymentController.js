const PaymentService = require('../services/PaymentService');
const { successResponse } = require('../utils/responseFormatter');

exports.createOrder = async (req, res, next) => {
  try {
    const { bookingId } = req.body;
    const userId = req.user.id;
    
    const order = await PaymentService.createOrder(bookingId, userId);
    return successResponse(res, order, 'Razorpay order generated securely', 201);
  } catch (error) {
    next(error);
  }
};

exports.verifyPayment = async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = req.body;
    const userId = req.user.id;

    const booking = await PaymentService.verifyPayment(
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature, 
      bookingId, 
      userId
    );

    return successResponse(res, booking, 'Payment verified and transaction cleanly finalized natively', 200);
  } catch (error) {
    next(error);
  }
};
