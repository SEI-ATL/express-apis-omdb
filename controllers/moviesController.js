
const moviesController = require('express').Router()
const db = require('../models');
const axios = require('axios')


moviesController.get('/', (req, res) => {
    res.redirect('index')
})

moviesController.get('/title', (req, res) => {
    let searchTerm = req.query.title;
    
    axios.get(`http://www.omdbapi.com/?s=${searchTerm}&apikey=${process.env.API_KEY}`)
    .then((response) => {    
        
        console.log(response.data.Search)

        res.render("movies/results", { movies: response.data.Search })
    })

})

moviesController.get('/detail/:id', (req, res) => {
    let searchTerm = req.params.id

    axios
    .get(
        `http://www.omdbapi.com/?i=${searchTerm}&apikey=${process.env.API_KEY}`
        )
        .then((response) => {
            res.render('movies/detail', { movies: response.data })
        })
});

moviesController.post('/faves', (req, res) => {
    db.fave.create({
        title: req.body.title,
        imdbid: req.body.imdbid,

    }).then(() => {
        res.redirect('/movies/faves')
    })
})

moviesController.get('/faves', (req, res) => {
    db.fave.findAll().then(allFaves => {
        res.render('movies/faves', {allFaves})
    })
})

  module.exports = moviesController