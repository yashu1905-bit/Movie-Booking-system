const ShowRepository = require('../repositories/ShowRepository');

class ShowService {
  async addShow(data) {
    return await ShowRepository.create(data);
  }
  async getShowsByMovie(movieId) {
    return await ShowRepository.findByMovie(movieId);
  }
  async getShowsByCity(city) {
    return await ShowRepository.findByCity(city);
  }
}

module.exports = new ShowService();
