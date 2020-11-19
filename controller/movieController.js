const { default: Axios } = require('axios')
const { response } = require('express');
const db = require('../models');

const movieRouter = require('express').Router()

const API_KEY = process.env.API_KEY;

movieRouter.get('/', (req, res) => {
    res.render('movies/index')
})

movieRouter.get('/title', (req, res) => {
    const searchTerm = req.query.title;
    // console.log('searchTerm', searchTerm);
    Axios.get(`http://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY}`)
    .then((response) => {
        console.log('somethingUnique', response.data.Search);
        res.render('movies/results', { movies: response.data.Search })
        // let results = response.data.Search;
        console.log(response.data.Title);
    })
})

movieRouter.get('/detail/:id', (req, res) => {
    const searchTerm = req.params.id;
    // console.log('searchTerm', searchTerm);
    Axios.get(`http://www.omdbapi.com/?i=${searchTerm}&apikey=${API_KEY}`)
    .then((response) => {
        // console.log('somethingUnique', response.data.Search);
        res.render('movies/detail', { movies: response.data })
        // let results = response.data.Search;
        console.log(response.data.Title);
    })
})

movieRouter.post('/faves', (req, res) => {
    console.log(req.body.title);
    db.fave.create({
        title: req.body.title,
        imdbid: req.body.imdbid,
    }).then(() => {
        res.redirect('/movies/faves')
    })
})

movieRouter.get('/faves', (req, res) => {
    db.fave.findAll().then(allFaves => {
        res.render('movies/faves', {allFaves})
    })
})

module.exports = movieRouter
