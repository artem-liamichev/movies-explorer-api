const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);

const validateUserBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message('Поле "email" должно быть валидным email-адресом')
      .messages({
        'string.empty': 'Поле "email" должно быть заполнено',
      }),
    password: Joi.string().required()
      .messages({
        'string.empty': 'Поле "password" должно быть заполнено',
      }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля "name" - 2',
        'string.max': 'Максимальная длина поля "name" - 30',
      }),
  }),
});

const validateUpdateUserInfoBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля "name" - 2',
        'string.max': 'Максимальная длина поля "name" - 30',
      }),
    email: Joi.string().required().email()
      .message('Поле "email" должно быть валидным email-адресом')
      .messages({
        'string.empty': 'Поле "email" должно быть заполнено',
      }),
  }),
});

const validateMovieBody = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required()
      .regex(/^https?:\/\/(www\.)?[a-zA-Z0-9\-.]{1,}\.[a-zA-Z]{1,4}[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]{1,}/)
      .message('Поле "image" должно быть валидным url-адресом'),
    trailerLink: Joi.string().required()
      .regex(/^https?:\/\/(www\.)?[a-zA-Z0-9\-.]{1,}\.[a-zA-Z]{1,4}[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]{1,}/)
      .message('Поле "trailerLink" должно быть валидным url-адресом'),
    thumbnail: Joi.string().required()
      .regex(/^https?:\/\/(www\.)?[a-zA-Z0-9\-.]{1,}\.[a-zA-Z]{1,4}[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]{1,}/)
      .message('Поле "thumbnail" должно быть валидным url-адресом'),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().required(),
  }),
});

const validateAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateuserId = celebrate({
  params: Joi.object().keys({
    id: Joi.objectId(),
  }),
});

const validatemovieId = celebrate({
  params: Joi.object().keys({
    _id: Joi.objectId(),
  }),
});

module.exports = {
  validateUserBody,
  validateUpdateUserInfoBody,
  validateAuthentication,
  validateuserId,
  validatemovieId,
  validateMovieBody,
};
