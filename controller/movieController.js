const { default: Axios } = require('axios')
const { response } = require('express')

const movieRouter = require('express').Router()

// const apiKey = 

movieRouter.get('/', (req, res) => {
    res.render('movies/index')
})

movieRouter.get('/:titleSearch', (req, res) => {
    const searchTerm = req.params.titleSearch;
    Axios.get(`http://www.omdbapi.com/?s=${searchTerm}apikey=d120ba49`)
    .then((response) => {
        res.render('movies/results', { movies: response.data.Search})
    })
    .catch((error) => {
        console.log(error);
    })
})

module.exports = movieRouter
