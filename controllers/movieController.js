require('dotenv').config();
let movieRouter = require('express').Router();
let axios = require('axios');
let db = require('../models');

movieRouter.get('/', (req, res) => {
  res.render('index');
});

movieRouter.get('/results', async (req, res) => {
  try {
    let q = req.query.q;
    let response = await axios.get(`http://www.omdbapi.com/?s=${q}&apikey=${process.env.EXPRESS_APP_API_KEY_OMDB}`);
    res.render('results', { searchResults: response.data.Search });
  } catch (error) {
    console.error(error);
  }
});

movieRouter.get('/movies/:movie_id', async (req, res) => {
  try {
    let movieId = req.params.movie_id;
    let response = await axios.get(`http://www.omdbapi.com/?i=${movieId}&apikey=${process.env.EXPRESS_APP_API_KEY_OMDB}`);
    console.log(response.data);
    res.render('detail', { movieDetails: response.data });
  } catch (error) {
    console.error(error);
  }
});

movieRouter.post('/faves', (req, res) => {
  console.log(req.body.title);
  db.fave.create({
    title: req.body.title,
    imdbid: req.body.imdbid
  }).then(createdFave => {
    console.log(createdFave);
  });
});

module.exports = movieRouter;