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

movieRouter.post("/faves", (req, res) => {
  const faveMovies = req.body;
  db.fave.create({
    title: faveMovies.title,
    imdbid: faveMovies.imdbID
  }).then(createdFave => {
    console.log(createdFave)
  })
})

movieRouter.get("/getall", (req, res) => {
  db.fave.findAll().then(allUsers => {
    console.log(allUsers)
});
})


module.exports = movieRouter;
