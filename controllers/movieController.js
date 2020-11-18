const fs = require('fs')
const fetch = require("node-fetch");
const { default:axios } = require('axios')
// const search = 'godfather';

const movieRouter = require('express').Router()

movieRouter.get('/', function(req, res){
    res.render('index')

})
movieRouter.get('/:titleSearch', function(req, res){
    res.render('index')
    const search = req.params.titleSearch
    console.log(search)
    axios.get(`http://www.omdbapi.com/?apikey=${api_key}&s=${search}`)
    // .then(response => response.json())
    .then(response => console.log(JSON.stringify(response.data)))
    // .then(res.render('/results'))
    // res.redirect('results')
    
    
    
})
















module.exports = movieRouter