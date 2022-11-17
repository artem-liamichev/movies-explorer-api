const jwt = require('jsonwebtoken');
require('dotenv').config();

const UnauthorizedRequestError = require('../errors/UnauthorizedRequestError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedRequestError('Необходима авторизация'));
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, `${NODE_ENV === 'production' ? JWT_SECRET : 'SECRET'}`);
  } catch (err) {
    next(new UnauthorizedRequestError('Необходима авторизация'));
  }

  req.user = payload;

  next();
};
