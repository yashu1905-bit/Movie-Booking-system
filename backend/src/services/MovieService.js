const MovieRepository = require('../repositories/MovieRepository');

class MovieService {
  async addMovie(movieData) {
    return await MovieRepository.create(movieData);
  }

  async getAllMovies() {
    return await MovieRepository.findAll();
  }

  async getMovieById(id) {
    const movie = await MovieRepository.findById(id);
    if (!movie) {
      const error = new Error('Movie not found');
      error.statusCode = 404;
      throw error;
    }
    return movie;
  }

  async updateMovie(id, updateData) {
    const movie = await MovieRepository.update(id, updateData);
    if (!movie) {
      const error = new Error('Movie not found');
      error.statusCode = 404;
      throw error;
    }
    return movie;
  }

  async deleteMovie(id) {
    const movie = await MovieRepository.delete(id);
    if (!movie) {
      const error = new Error('Movie not found');
      error.statusCode = 404;
      throw error;
    }
    return movie;
  }
}

module.exports = new MovieService();
