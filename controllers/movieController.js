const movieRouter = require("express").Router();
const axios = require("axios");

movieRouter.get("/", (req, res) => {
  res.render("movies/index");
});

// SEARCH MOVIES BY TITLE
movieRouter.get("/results", (req, res) => {
  const searchTerm = req.query.q;
  axios
    .get(
      `http://www.omdbapi.com/?s=${searchTerm}&apikey=${process.env.API_KEY}`)
    .then((response) => {
      const results = response.data.Search
      res.render("movies/results", { searchTerm: response.data.Search })
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
