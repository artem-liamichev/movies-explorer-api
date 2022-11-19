const express = require('express');

const movieRoutes = express.Router();

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

const { validatemovieId, validateMovieBody } = require('../validators');

movieRoutes.get('/', getMovies);
movieRoutes.post('/', validateMovieBody, createMovie);
movieRoutes.delete('/:_id', validatemovieId, deleteMovie);

module.exports = {
  movieRoutes,
};
