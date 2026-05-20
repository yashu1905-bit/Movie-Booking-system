const TheaterService = require('../services/TheaterService');
const { successResponse } = require('../utils/responseFormatter');

exports.createTheater = async (req, res, next) => {
  try {
    const theater = await TheaterService.addTheater(req.body);
    return successResponse(res, theater, 'Theater created successfully', 201);
  } catch (error) {
    next(error);
  }
};

exports.getTheaters = async (req, res, next) => {
  try {
    const { city } = req.query;
    if (city) {
      const theaters = await TheaterService.getTheatersByCity(city);
      return successResponse(res, theaters, `Theaters in ${city} retrieved successfully`, 200);
    }
    const theaters = await TheaterService.getTheaters();
    return successResponse(res, theaters, 'All theaters retrieved successfully', 200);
  } catch (error) {
    next(error);
  }
};
