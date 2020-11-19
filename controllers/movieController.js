require('dotenv').config();
let movieRouter = require('express').Router();
let axios = require('axios');
let db = require('../models');

movieRouter.get('/', (req, res) => {
  res.render('index', { error: req.query.error });
});

movieRouter.get('/results', async (req, res) => {
  try {
    let q = req.query.q;
    let response = await axios.get(`http://www.omdbapi.com/?s=${q}&apikey=${process.env.EXPRESS_APP_API_KEY_OMDB}`);
    console.log(response);
    if (response.data.Error) {
      res.redirect(`/?error=${response.data.Error}`);
    } else {
      res.render('results', { searchResults: response.data.Search });
    }
  } catch (error) {
    console.error(error);
  }
});

movieRouter.get('/movies/:movie_id', async (req, res) => {
  try {
    let movieId = req.params.movie_id;
    let response = await axios.get(`http://www.omdbapi.com/?i=${movieId}&apikey=${process.env.EXPRESS_APP_API_KEY_OMDB}`);
    res.render('detail', { movieDetails: response.data });
  } catch (error) {
    console.error(error);
  }
});

movieRouter.post('/faves', (req, res) => {
  db.fave.findOrCreate({
    where: {
      imdbid: req.body.imdbid
    },
    defaults: {
      title: req.body.title,
      poster: req.body.poster
    }
  }).then(([fave, created]) => {
    res.redirect('/faves');
  });
});

movieRouter.get('/faves', (req, res) => {
  db.fave.findAll()
    .then(faves => {
      res.render('faves', { faves: faves });
    });
});

movieRouter.delete('/faves/:imdbid', (req, res) => {
  db.fave.destroy({
    where: {
      imdbid: req.params.imdbid
    }
  }).then(numRowsDeleted => {
    console.log(numRowsDeleted);
    res.redirect('/faves');
  });
});

module.exports = movieRouter;