const fs = require('fs')
const axios = require('axios');
const db = require('../models');
const movieRouter = require('express').Router()
require('dotenv').config();


movieRouter.get('/', (req, res) => {
    res.render('index')
})

movieRouter.get('/faves', function (req, res) {
   db.fave.findAll().then(allFaves => {
    res.render('faves', {allFaves})
   })
})



movieRouter.get('/:title', (req, res) => {
    const searchTerm = req.query.title;
    axios.get(`http://www.omdbapi.com/?s=${searchTerm}&apikey=${process.env.API_KEY}`)
    .then((response) => {
        res.render("results", { movies: response.data.Search })
    })
  });

movieRouter.get('/detail/:id', (req, res) => {
    const searchTerm = req.params.id;
    axios
    .get(
        `http://www.omdbapi.com/?i=${searchTerm}&apikey=${process.env.API_KEY}`
        )
        .then((response) => {
            res.render('detail', { movies: response.data })
        })
});
  
movieRouter.post('/faves', (req, res) => {
    db.fave.create({
        title:req.body.title,
        imdb: req.body.imdbid
    }).then(() => {
        res.redirect('faves')
    })    
})
  
module.exports = movieRouter;