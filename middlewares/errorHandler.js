const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message = 'Неизвестная ошибка сервера' } = err;
  res.status(statusCode).json({ message: statusCode === 500 ? 'Неизвестная ошибка сервера' : message });
  next();
};

module.exports = errorHandler;
