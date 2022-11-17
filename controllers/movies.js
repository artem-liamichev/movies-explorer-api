const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

//возвращает все сохранённые текущим  пользователем фильмы
const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch((err) => {
      next(err);
    });
};

const createMovie = (req, res, next) => {
  const { country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId } = req.body;
  const owner = req.user._id;
  Movie.create({ country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId, owner })
    // .then((doc) => doc.populate(['owner']))
    .then((movie) => {
      console.dir(movie)
      res.send(movie)
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        console.dir('err:', err)
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError('Фильм с указанным id не найден'));
      }
      if (req.user._id === movie.owner.toString()) {
        return movie.delete()
          .then(() => res.send({ message: 'Фильм удален' }));
      }
      return next(new ForbiddenError('Вы можете удалить только свой фильм'));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Удаление фильма с некорректным id'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};