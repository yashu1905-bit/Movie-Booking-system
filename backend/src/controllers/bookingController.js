const BookingService = require('../services/BookingService');
const { successResponse } = require('../utils/responseFormatter');

exports.createBooking = async (req, res, next) => {
  try {
    const { showId, seats, totalAmount, discountCode } = req.body;
    const userId = req.user.id; 
    
    const booking = await BookingService.createBooking(showId, seats, userId, totalAmount, discountCode);
    return successResponse(res, booking, 'Booking created successfully', 201);
  } catch (error) {
    next(error);
  }
};

exports.getUserBookings = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const bookings = await BookingService.getUserBookings(userId);
    return successResponse(res, bookings, 'User bookings retrieved successfully', 200);
  } catch (error) {
    next(error);
  }
};

exports.cancelBooking = async (req, res, next) => {
  try {
    const { id } = req.params; // bookingId target boundary natively
    const userId = req.user.id;
    const booking = await BookingService.cancelBooking(id, userId);
    return successResponse(res, booking, 'Booking cancelled successfully', 200);
  } catch (error) {
    next(error);
  }
};
