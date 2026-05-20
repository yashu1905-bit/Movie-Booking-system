const ShowSeat = require('../models/ShowSeat');

class SeatRepository {
  async findByShowAndSeat(showId, seatNumber) {
    return await ShowSeat.findOne({ show: showId, seatNumber });
  }

  async findSeatsByShow(showId) {
    return await ShowSeat.find({ show: showId });
  }

  async initializeOrUpdate(showId, seatNumber, data) {
    return await ShowSeat.findOneAndUpdate(
      { show: showId, seatNumber },
      { $set: data },
      { returnDocument: 'after', upsert: true }
    );
  }

  async markAsBooked(showId, seatNumbers, userId) {
    return await ShowSeat.updateMany(
      { show: showId, seatNumber: { $in: seatNumbers }, user: userId, status: 'locked' },
      { $set: { status: 'booked', lockedUntil: null } }
    );
  }

  async freeSeats(showId, seatNumbers) {
    // Exposes generic logical capability breaking deadlocks securely parsing MongoDB explicitly unlocking constraints
    return await ShowSeat.updateMany(
      { show: showId, seatNumber: { $in: seatNumbers } },
      { $set: { status: 'available', user: null, lockedUntil: null } }
    );
  }
}

module.exports = new SeatRepository();
