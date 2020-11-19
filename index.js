const express = require('express');
const app = express();
const layouts = require('express-ejs-layouts');
const axios = require('axios').default;
require('dotenv').config();
const db = require('./models');

app.set('view engine', 'ejs');
app.use(layouts);

app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/results?:movieName', function (req, res) {
    const movieName = req.query.movieName;
  
    axios.get(`http://www.omdbapi.com/?s=${movieName}&apikey=${process.env.api}`)
    .then((response) => {
        const movieResults = response.data.Search
        res.render('results', { movieResults })   
    })
})

app.get('/movies/:movie_id', (req, res) => {
    movieId = req.params.movie_id;
    axios.get(`http://www.omdbapi.com/?i=${movieId}&apikey=${process.env.api}`)
    .then((response) => {
    const idResults = response.data
    res.render('detail', { idResults })   
})
})

app.post('/faves', (req, res) => {
    const newFave = req.body
    console.log(newFave)
  
    res.redirect('/')
})

app.listen(8000, () => {
    console.log('server started')
})

