const movieRouter = require('express').Router();
const axios = require('axios');
const API_KEY = '29fb6c49';

//routes
movieRouter.get('/', (req, res) => {
    res.render('index');
});

movieRouter.get('/results', (req, res) => {
    let searchQuery = req.query.title;
    axios.get(`http://www.omdbapi.com/?s=${searchQuery}&apikey=${API_KEY}`, (res) => {
        let movieData = res.json.data;
    }).then((movieData) => {
        console.log(movieData.data.Search);
        res.render('results', {data: movieData.data.Search})
    });
});

movieRouter.get('/movies/:movie_id', (req, res) => {
    res.render('detail');
});



module.exports = movieRouter;