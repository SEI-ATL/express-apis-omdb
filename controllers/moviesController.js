
const moviesController = require('express').Router()

const axios = require('axios')
const { json } = require('express')

moviesController.get('/', (req, res) => {
    res.redirect('index')
})

moviesController.get('/:title', (req, res) => {
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
            console.log(response.data);
        })
});

  module.exports = moviesController