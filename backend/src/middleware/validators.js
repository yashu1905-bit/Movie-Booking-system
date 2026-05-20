const { check, validationResult } = require('express-validator');
const AppError = require('../errors/AppError');

exports.validateSignup = [
  check('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required.')
    .isLength({ min: 2 })
    .withMessage('First name must be at least 2 characters long.'),
  check('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address.'),
  check('password')
    .trim()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long.'),
  check('phone')
    .optional()
    .trim()
    .isMobilePhone()
    .withMessage('Please provide a valid phone number.'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const message = errors.array().map(err => err.msg).join(' ');
      return next(new AppError(message, 400));
    }
    next();
  }
];

exports.validateLogin = [
  check('email').isEmail().withMessage('Valid email required.'),
  check('password').notEmpty().withMessage('Password required.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new AppError('Invalid email or password.', 401));
    }
    next();
  }
];
