const ShowService = require('../services/ShowService');
const { successResponse } = require('../utils/responseFormatter');

exports.createShow = async (req, res, next) => {
  try {
    const show = await ShowService.addShow(req.body);
    return successResponse(res, show, 'Show metadata logged successfully', 201);
  } catch (error) {
    next(error);
  }
};

exports.getShowsByMovie = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const shows = await ShowService.getShowsByMovie(movieId);
    return successResponse(res, shows, 'Targeted show timings generated successfully', 200);
  } catch (error) {
    next(error);
  }
};

exports.getShowsByCity = async (req, res, next) => {
  try {
    const { city } = req.query;
    if (!city) {
      const error = new Error('A `city` parameter target is explicitly required constraints');
      error.statusCode = 400;
      return next(error);
    }
    const shows = await ShowService.getShowsByCity(city);
    return successResponse(res, shows, `Live shows mapped natively in ${city}`, 200);
  } catch (error) {
    next(error);
  }
};
