const Theater = require('../models/Theater');

class TheaterRepository {
  async create(data) {
    const theater = new Theater(data);
    return await theater.save();
  }

  async findByCity(city) {
    // Allows case insensitive regex querying for localized theater searching
    return await Theater.find({ city: new RegExp(`^${city}$`, 'i') }).lean();
  }

  async findAll() {
    return await Theater.find().lean();
  }
}

module.exports = new TheaterRepository();
