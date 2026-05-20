const jwt = require('jsonwebtoken');
const AppError = require('../errors/AppError');
const appConfig = require('../config/appConfig');

module.exports = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return next(new AppError('Access denied. No token provided.', 401));
  }

  try {
    const decoded = jwt.verify(token, appConfig.jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    return next(new AppError('Invalid or expired access token.', 401));
  }
};
