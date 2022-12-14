module.exports = (err, req, res, next) => {
  console.log(err);

  if (
    err.name === 'SequelizeUniqueConstraintError' ||
    err.name === 'SequelizeValidationError'
  ) {
    err.statusCode = 400;
    err.message = err.errors[0].message;
    // console.log(err);
  }

  if (err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError') {
    err.statusCode(401);
  }
  res.status(err.statusCode || 500).json({ message: err.message });
};
