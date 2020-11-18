const movieRouter = require("express").Router();
const axios = require("axios");

movieRouter.get("/", (req, res) => {
  res.render("movies/index");
});

// SEARCH MOVIES BY TITLE
movieRouter.get("/:title", (req, res) => {
  const searchTerm = req.params.title;
  axios
    .get(
      `http://www.omdbapi.com/?s=${searchTerm}&apikey=${process.env.API_KEY}`,
      console.log(`http://www.omdbapi.com/?s=${searchTerm}&apikey=${process.env.API_KEY}`)
    )
    .then((response) => {
      res.render("movies/results", { movies: response.data.Search })
    })
    .catch((error) => {
      console.log(error);
    })
});

module.exports = movieRouter;

// When user clicks "SUBMIT", grab user text from Search box
// Store that text in a variable
// Include that text in search API string
// I.e. the search text will need to be stored in a variable.
// JSON.parse to parse the data
//
