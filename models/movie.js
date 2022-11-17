const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    reuquired: true,
  },
  image: {
    type: String,
    match: (/^(https?:\/\/)?([\da-z-]+)\.([a-z]{2,6})([\w -]*)*\/?$/),
    required: true,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  trailerLink: {
    type: String,
    match: (/^(https?:\/\/)?([\da-z-]+)\.([a-z]{2,6})([\w -]*)*\/?$/),
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    required: true,
  },
  thumbnail: {
    type: String,
    match: (/^(https?:\/\/)?([\da-z-]+)\.([a-z]{2,6})([\w -]*)*\/?$/),
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
