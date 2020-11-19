const express = require('express');
const { default: axios } = require('axios');
const db = require('../models');

const movieRouter = require('express').Router();

movieRouter.get('/', (req, res) => {
    res.render('movies/index')
})

movieRouter.get('/title', (req, res) => {
    const searchTerm = req.query.title;
    console.log(searchTerm);
    axios.get(`http://www.omdbapi.com/?s=${searchTerm}&apikey=${process.env.API_KEY}`).then((response) => {
        res.render('movies/results', { query: response.data.Search })
    });
  });

  movieRouter.get('/detail/:id', (req, res) => {
    const searchTerm = req.params.id;
    axios
    .get(
        `http://www.omdbapi.com/?i=${searchTerm}&apikey=${process.env.API_KEY}`
        )
        .then((response) => {
            res.render('movies/detail', { movies: response.data })
        })
        .catch((error) => {
            console.log(error);
        })
});

movieRouter.post('/faves', (req, res) => {
    db.fave.create({
        title: req.body.title,
        imdbid: req.body.imdbid,
    }).then(() => {
        res.redirect('/movies/faves')
    })
})

movieRouter.get('/faves', (req, res) => {   
    db.fave.findAll().then(allFaves => {
        res.render('movies/faves', { allFaves })
    })
})

  module.exports = movieRouter;