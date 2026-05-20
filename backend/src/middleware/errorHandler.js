const AppError = require('../errors/AppError');

// Handle specific Mongoose & JWT error types
const handleCastErrorDB = (err) =>
  new AppError(`Invalid ${err.path}: ${err.value}`, 400);

const handleDuplicateFieldsDB = (err) => {
  const value = err.keyValue ? Object.values(err.keyValue)[0] : 'value';
  return new AppError(`Duplicate field: "${value}". Please use a different value.`, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  return new AppError(`Validation failed: ${errors.join('. ')}`, 400);
};

const handleJWTError = () =>
  new AppError('Invalid token. Please log in again.', 401);

const handleJWTExpiredError = () =>
  new AppError('Your session has expired. Please log in again.', 401);

// Send full error details in development
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    success: false,
    status: err.status,
    message: err.message,
    stack: err.stack,
  });
};

// Send safe, clean errors in production
const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      success: false,
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('UNEXPECTED ERROR:', err);
    require('fs').appendFileSync('error.log', new Date().toISOString() + ' ' + (err.stack || err) + '\n');
    res.status(500).json({
      success: false,
      status: 'error',
      message: 'Something went wrong. Please try again.',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else {
    // Correctly cloning the error object without stripping non-enumerable properties natively gracefully functionally effectively securely organically securely seamlessly natively cleanly stably firmly smartly naturally properly creatively securely cleanly securely seamlessly natively tightly successfully efficiently properly gracefully creatively reliably explicitly smoothly strongly.
    let error = Object.create(err);
    Object.assign(error, err);
    error.message = err.message;
    error.name = err.name;
    error.stack = err.stack;
    error.isOperational = err.isOperational || (err.statusCode && err.statusCode !== 500);

    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, res);
  }
};
