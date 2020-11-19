const moviesController = require('express').Router()
const axios = require('axios')
require('dotenv').config();

moviesController.get('/', (req, res) => {
    res.render('index')
})
moviesController.get('/detail/:id', (req, res) => {
    const searchTerm = req.params.id;
    axios
    .get(
        `http://www.omdbapi.com/?i=${searchTerm}&apikey=${process.env.API_KEY}`
        )
        .then((response) => {
            res.render('movies/detail', { movies: response.data })
            // console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
});

moviesController.get('/:title', (req, res) => {
    const searchTerm = req.query.title;
    axios
    .get(
        `http://www.omdbapi.com/?s=${searchTerm}&apikey=${process.env.API_KEY}`
        )
        .then((response) => {
            res.render('results', { movies: response.data.Search })
        })
        .catch((error) => {
            console.log(error);
        })
});


  module.exports = moviesController
