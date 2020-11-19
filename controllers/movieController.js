const movieRouter = require("express").Router();
const axios = require("axios");
const db = require('../models');

movieRouter.get("/", (req, res) => {
  res.render("movies/index");
});

// SEARCH MOVIES BY TITLE
movieRouter.get("/results", (req, res) => {
  const query = req.query.q;
  axios
    .get(
      `http://www.omdbapi.com/?s=${query}&apikey=${process.env.API_KEY}`)
    .then((response) => {
      const results = response.data.Search
      console.log(results)
      res.render("movies/results", { query: response.data.Search })
    })
    .catch((error) => {
      console.log(error);
    })
});

movieRouter.get("/movies/:movie_id", (req, res) => {
  const movieId = req.params.movie_id;
  axios.get(`http://www.omdbapi.com/?i=${movieId}&apikey=${process.env.API_KEY}`)
  .then((response) => {
    const title = `Movie Details: ${movieId}`
    const movieDetails = response.data
    res.render('movies/detail', { movieDetails } )
  })
  .catch((error) => {
    res.send("You've gotten an error.")
    console.log(error)
  })
})

// POST TO FAVES
movieRouter.post('/faves', (req, res) => {
  console.log(db)
  db.fave.create(req.body).then(() => {
    res.redirect('/movies/faves')
  }).catch((error) => {
    console.log(error)
  })
})

// GET FAVES
movieRouter.get("/faves", (req, res) => {
  db.fave.findAll().then(foundFaves => {
    res.render('movies/faves', {foundFaves})
});
})


module.exports = movieRouter;
