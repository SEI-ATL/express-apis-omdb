const movieRouter = require('express').Router();
const axios = require('axios');


//routes
movieRouter.get('/', (req, res) => {
    res.render('index');
});

movieRouter.get('/results', (req, res) => {
    let searchQuery = req.query.title;
    axios.get(`http://www.omdbapi.com/?s=${searchQuery}&apikey=${process.env.API}`, (res) => {
        let movieData = res.json.data;
    }).then((movieData) => {
        res.render('results', {data: movieData.data.Search})
    });
});

movieRouter.get('/movies/:movie_id', (req, res) => {
    let searchId = req.params.movie_id;
    axios.get(`http://www.omdbapi.com/?i=${searchId}&apikey=${process.env.API}`, (res) => {
        let movieData = res.json;
    }).then((movieData) => {
        res.render('detail', { data: movieData.data });
    })
});



module.exports = movieRouter;