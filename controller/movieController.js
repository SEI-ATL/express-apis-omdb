const { default: Axios } = require('axios')
const { response } = require('express')

const movieRouter = require('express').Router()

const apiKey = process.env.API_KEY;

movieRouter.get('/', (req, res) => {
    res.render('index')
})

movieRouter.get('/results', (req, res) => {
    let searchTerm = req.query.titleSeach;
    Axios.get(`http://www.omdbapi.com/?t=${searchTerm}&apikey=${apiKey}`)
    .then((data) => {
        let results = data.Search;
        res.render('results', { results: titleSearch})
    })
})

module.exports = movieRouter
