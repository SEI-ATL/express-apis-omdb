const fs = require('fs')
const axios = require('axios')
const movieRouter = require('express').Router()
require('dotenv').config();


// movieRouter.get('/', function(req, res) {
//     res.send('Hello, backend!');
//   });

movieRouter.get('/', (req, res) => {
    res.render('index')
})


movieRouter.get('/search/:searchTerm', (req, res) => {
    const searchTerm = req.query.searchTerm;
    axios.get(`http://www.omdbapi.com/?s=${searchTerm}&apikey=${process.env.API_KEY}`)
    .then((response) => {
        res.render("movies/results", { movies: response.data.Search })
    })
    .catch((error) => {
        console.log(error)
    })
  });
  
  
  
  module.exports = movieRouter;