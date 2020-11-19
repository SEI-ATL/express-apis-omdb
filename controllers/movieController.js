const db = require('../models');
const movieRouter = require('express').Router();
const axios = require('axios');

//routes
movieRouter.get('/', (req, res) => {
    res.render('index');
});

movieRouter.get('/results', (req, res) => {
    let searchQuery = req.query.title;
    axios.get(`http://www.omdbapi.com/?s=${searchQuery}&apikey=${process.env.API}`, (omdbRes) => {
        let movieData = omdbRes.json.data;
    }).then((movieData) => {
        res.render('results', {data: movieData.data.Search})
    });
});

movieRouter.get('/movies/:movie_id', (req, res) => {
    let searchId = req.params.movie_id;
    axios.get(`http://www.omdbapi.com/?i=${searchId}&apikey=${process.env.API}`, (omdbRes) => {
        let movieData = omdbRes.json;
    }).then((movieData) => {
        console.log(movieData.data);
        res.render('detail', { data: movieData.data });
    })
});

movieRouter.get('/faves', (req, res) => {
    db.faves.findAll().then(dbRes => {
        res.render('faves', { favesArray: dbRes });
    })
})

movieRouter.post('/faves', (req, res) => {
    db.faves.create({
        title: req.body.title,
        imdbid: req.body.imdbid
    }).then(dbRes => {
        console.log(dbRes.get());
    }).then(() => {
        res.redirect('/faves');
    });
})

module.exports = movieRouter;