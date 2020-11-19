const fs = require('fs')
const fetch = require("node-fetch");
const { default:axios } = require('axios');
const db = require ('../models')

const movieRouter = require('express').Router()

movieRouter.get('/', function(req, res){
    res.render('index')

})
movieRouter.get('/results', function(req, res){
    const title = req.query.titleSearch
    // console.log(title)
    axios.get(`http://www.omdbapi.com/?apikey=${api_key}&s=${title}`)
    .then((response) => {console.log((response.data.Search))
        const iD = response.data.Search.imbID
        const results = response.data.Search
    res.render('results', { results })
    // console.log("results", results)
    })

    
})

movieRouter.get('/details/:movieId', function(req, res){
    // const title = req.query.movieDetail
    const movieId = req.params.movieId;

    axios.get(`http://www.omdbapi.com/?apikey=${api_key}&i=${movieId}`)
    .then((response) => {console.log("response", response.data)
    const movieDetails = response.data
    // console.log("movieDetails", movieDetails)
    res.render('detail', {movieDetails})
    // console.log(movieId)
})
})

movieRouter.post('/faves', function (req, res){
    const favorites = req.body
    db.fave.create({title: favorites.movieName, imdbid: favorites.imbdid})
    .then(faveMovie => {
    })
    res.redirect('faves')
})

movieRouter.get('/faves', function (req, res){
    db.fave.findAll().then(allFaves => {

        res.render('faves', {allFaves})
        console.log(allFaves)

    })
})











module.exports = movieRouter