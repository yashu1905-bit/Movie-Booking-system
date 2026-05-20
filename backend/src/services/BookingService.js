const SeatRepository = require('../repositories/SeatRepository');
const BookingRepository = require('../repositories/BookingRepository');
const DiscountService = require('./DiscountService');
const NotificationService = require('./NotificationService');

class BookingService {
  async createBooking(showId, seatNumbers, userId, baseAmount, discountCode) {
    let finalAmount = baseAmount;
    let originalAmount = baseAmount;
    let appliedDiscountCode = null;

    if (discountCode) {
      const discountResult = await DiscountService.validateDiscount(discountCode, baseAmount);
      finalAmount = discountResult.finalAmount;
      appliedDiscountCode = discountResult.discountDoc.code;
    }

    // Generously initialize booking straight through and set explicit booked status overriding previous locks mappings securely
    for (const seatNumber of seatNumbers) {
       await SeatRepository.initializeOrUpdate(
          showId, 
          seatNumber, 
          { status: 'booked', user: userId, lockedUntil: null }
       );
    }

    const booking = await BookingRepository.create({
      userId,
      showId,
      seats: seatNumbers,
      totalAmount: finalAmount,
      originalAmount: originalAmount,
      discountCode: appliedDiscountCode,
      paymentStatus: 'completed',
      status: 'confirmed'
    });

    if (appliedDiscountCode) {
       await DiscountService.incrementUsage(discountResult.discountDoc._id);
    }

    // Auto-dispatch "Booking Confirmed" persistent notification dynamically seamlessly expertly
    await NotificationService.createNotification(
       userId,
       'Ticket Booked 🍿',
       `Your cinematic booking for seats ${seatNumbers.join(', ')} has been validated explicitly mapped. Enjoy the movie structurally mapping cleanly!`,
       'booking'
    );

    return booking;
  }

  async getUserBookings(userId) {
    return await BookingRepository.findByUser(userId);
  }

  async cancelBooking(bookingId, userId) {
    const booking = await BookingRepository.findById(bookingId);
    if (!booking) {
      const error = new Error('Booking tracking ledger not found');
      error.statusCode = 404;
      throw error;
    }
    if (booking.userId.toString() !== userId) {
      const error = new Error('Not authorized to manipulate transaction ledgers owned by alternative users');
      error.statusCode = 403;
      throw error;
    }
    if (booking.status === 'cancelled') {
        const error = new Error('Resource explicitly restricted tracking operations permanently neutralized tracking contexts');
        error.statusCode = 400;
        throw error;
    }

    booking.status = 'cancelled';
    await booking.save();

    await SeatRepository.freeSeats(booking.showId, booking.seats);

    return booking;
  }
}

module.exports = new BookingService();
