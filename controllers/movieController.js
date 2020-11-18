const fs = require('fs')
const fetch = require("node-fetch");
const { default:axios } = require('axios');
// const { title } = require('process');

const movieRouter = require('express').Router()

movieRouter.get('/', function(req, res){
    res.render('index')

})
movieRouter.get('/results', function(req, res){
    // res.render('index')
    const title = req.query.titleSearch
    console.log(title)
    axios.get(`http://www.omdbapi.com/?apikey=${api_key}&s=${title}`)
    // .then(response => response.json())
    .then((response) => {console.log((response.data.Search))
    res.render('results')
    })
    // .then(res.render('/results'))
    
    
    
    
})
















module.exports = movieRouter