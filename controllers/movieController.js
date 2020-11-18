const express = require('express');
const { default: Axios } = require('axios');

const movieRouter = require('express').Router();

movieRouter.get('/', (req, res) => {
    res.render('movies/index')
})

movieRouter.get('/search/:searchTerm', (req, res) => {
    const searchTerm = req.params.searchTerm;
    console.log(searchTerm);
    Axios.get(`http://www.omdbapi.com/?s=${searchTerm}&apikey=${process.env.API_KEY}`).then((res) => {
    })
    .then(res.render('movies/results'))
  });

  module.exports = movieRouter;