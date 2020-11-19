require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const axios = require('axios')
const apiKey = process.env.API_KEY

const models = require('./models')

// Sets EJS as the view engine
app.set('view engine', 'ejs');
// Specifies the location of the static assets folder
app.use(express.static('static'));
// Sets up body-parser for parsing form data
app.use(express.urlencoded({ extended: false }));
// Enables EJS Layouts middleware
app.use(ejsLayouts);

// Adds some logging to each request
app.use(require('morgan')('dev'));

// Routes
app.get('/', function(req, res) {
  res.render('index');
});


app.get('/results', (req, res) => {
  const query = req.query.q;
  axios
    .get(`https://www.omdbapi.com/?apikey=64e0f9b4&s=${query}`)
    .then(function (response) {
      const title = `${response.data.Search.length} Matches Found for '${query}'`;
      res.render('results', {
        title,
        results: response.data.Search,
      });
    })
});

app.get('/movies/:movie_id', (req, res) => {
  const movieid = req.params.movie_id;
  axios
    .get(`https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${movieid}`)
    .then(function (response) {
      const title = `Movie Details: ${movieid}`;
      res.render('detail', { title, details: response.data });
      console.log(response.data);
    })
});

app.post('/faves/', (req, res) => {
  models.fave.create(req.body).then((createdFave => {
    res.redirect('/faves')
  })
})

app.get('/faves', (req, res) => {
  models.fave.findAll().then((foundFaves) => {
    res.render('faves', { faves: foundFaves} )
  })
})


// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;
