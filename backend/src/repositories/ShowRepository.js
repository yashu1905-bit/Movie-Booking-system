const BaseRepository = require('./BaseRepository');

class ShowRepository extends BaseRepository {
  async findAll(filter = {}) {
    return await this.model.find(filter)
      .populate('movie', 'title posterUrl duration')
      .populate('theater', 'name location city');
  }
}

module.exports = ShowRepository;
