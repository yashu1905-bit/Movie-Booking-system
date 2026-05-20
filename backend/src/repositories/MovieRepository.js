const Movie = require('../models/Movie');

class MovieRepository {
  async create(movieData) {
    const movie = new Movie(movieData);
    return await movie.save();
  }

  async findAll() {
    return await Movie.find().sort({ createdAt: -1 }).lean();
  }

  async findById(id) {
    return await Movie.findById(id).lean();
  }

  async update(id, updateData) {
    return await Movie.findByIdAndUpdate(id, updateData, { returnDocument: 'after', runValidators: true });
  }

  async delete(id) {
    return await Movie.findByIdAndDelete(id);
  }
}

module.exports = new MovieRepository();
