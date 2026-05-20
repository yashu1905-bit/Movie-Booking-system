const MovieService = require('../services/MovieService');
const { successResponse } = require('../utils/responseFormatter');

exports.createMovie = async (req, res, next) => {
  try {
    const movie = await MovieService.addMovie(req.body);
    return successResponse(res, movie, 'Movie created successfully', 201);
  } catch (error) {
    next(error);
  }
};

exports.getMovies = async (req, res, next) => {
  try {
    const movies = await MovieService.getAllMovies();
    return successResponse(res, movies, 'Movies retrieved successfully', 200);
  } catch (error) {
    next(error);
  }
};

exports.getMovie = async (req, res, next) => {
  try {
    const movie = await MovieService.getMovieById(req.params.id);
    return successResponse(res, movie, 'Movie retrieved successfully', 200);
  } catch (error) {
    next(error);
  }
};

exports.updateMovie = async (req, res, next) => {
  try {
    const movie = await MovieService.updateMovie(req.params.id, req.body);
    return successResponse(res, movie, 'Movie updated successfully', 200);
  } catch (error) {
    next(error);
  }
};

exports.deleteMovie = async (req, res, next) => {
  try {
    await MovieService.deleteMovie(req.params.id);
    return successResponse(res, null, 'Movie deleted successfully', 200);
  } catch (error) {
    next(error);
  }
};
