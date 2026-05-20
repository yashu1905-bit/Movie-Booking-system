const BaseRepository = require('./BaseRepository');

class BookingRepository extends BaseRepository {
  async findAll(filter = {}) {
    // Override findAll to aggressively populate references for the Admin views
    return await this.model.find(filter)
      .populate('userId', 'firstName lastName email')
      .populate({
        path: 'showId',
        populate: {
          path: 'movie', 
          select: 'title'
        }
      });
  }
}

module.exports = BookingRepository;
