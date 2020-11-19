require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const axios = require('axios');
const apiKey = process.env.API_KEY;
const db = require('./models')


// Sets EJS as the view engine
app.set('view engine', 'ejs');
// Specifies the location of the static assets folder
app.use(express.static(__dirname + '/static'));
// Sets up body-parser for parsing form data
app.use(express.urlencoded({ extended: false }));
// Enables EJS Layouts middleware
app.use(ejsLayouts);


// Adds some logging to each request
app.use(require('morgan')('dev'));

// Routes
app.get('/', function(req, res) {
    res.render('index')
});

app.post('/', (req, res) => {
    let movieTitle = req.body.title;
    let movieId = req.body.movieId;
    db.fave.create({
        title: movieTitle,
        imdbid: movieId
    }).then(() => {
        res.redirect('/faves');
    })
})


app.get('/faves', (req, res) => {
    //call the database info
    db.fave.findAll()
        .then((response) => {
            let movieCalls = [];
            response.forEach(element => {
                let movie = element.get();
                let movie_id = movie.imdbid;
                movieCalls.push(axios.get(`http://www.omdbapi.com/?i=${movie_id}&apikey=${apiKey}`));
            })
            Promise.all(movieCalls).then((faves) => {
                res.render('faves', { faves })
            });
        });
});

app.get('/results', (req, res) => {
    let title = req.query.q;
    axios.get(`http://www.omdbapi.com/?s=${title}&apikey=${apiKey}`)
        .then((data) => {
            let results = data.data.Search;
            res.render('results', { results, title });
        })
})


app.get('/movies/:movie_id', (req, res) => {
    axios.get(`http://www.omdbapi.com/?i=${req.params.movie_id}&apikey=${apiKey}`)
        .then((data) => {
            let movie = data.data;
            res.render('detail', { movie });
        })
})

// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000, () => console.log('start'));

// We can export this server to other servers like this
module.exports = server;