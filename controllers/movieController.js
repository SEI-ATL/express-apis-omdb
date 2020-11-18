require('dotenv').config();
let movieRouter = require('express').Router();
let fs = require('fs');
let axios = require('axios');


movieRouter.get('/', (req, res) => {
  res.render('index');
});

movieRouter.get('/results', async (req, res) => {
  try {
    let q = req.query.q;
    let response = await axios.get(`http://www.omdbapi.com/?s=${q}&apikey=${process.env.EXPRESS_APP_API_KEY_OMDB}`);
    console.log(response.data);
    res.render('results', { searchResults: response.data.Search });
  } catch (error) {
    console.error(error);
  }
});

movieRouter.get('/movies/:movie_id', async (req, res) => {
  try {
    let movieId = req.params.movie_id;
    let response = await axios.get(`http://www.omdbapi.com/?i=${movieId}&apikey=${process.env.EXPRESS_APP_API_KEY_OMDB}`);
  } catch (error) {

  }
});

module.exports = movieRouter;