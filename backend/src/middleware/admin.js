module.exports = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    const error = new Error('Not authorized. Administrator access required.');
    error.statusCode = 403;
    next(error);
  }
};
