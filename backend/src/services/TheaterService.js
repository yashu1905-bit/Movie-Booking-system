const TheaterRepository = require('../repositories/TheaterRepository');

class TheaterService {
  async addTheater(data) {
    return await TheaterRepository.create(data);
  }
  async getTheaters() {
    return await TheaterRepository.findAll();
  }
  async getTheatersByCity(city) {
    return await TheaterRepository.findByCity(city);
  }
}

module.exports = new TheaterService();
