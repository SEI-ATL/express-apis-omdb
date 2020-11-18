require('dotenv').config();
const express = require('express');
const app = express();
//var request = require('request');
const axios = require('axios').default;
const ejsLayouts = require('express-ejs-layouts');
const path = require('path'); // for path


// Sets EJS as the view engine
app.set('view engine', 'ejs');
// Specifies the location of the static assets folder
app.use(express.static('static'));
// Sets up body-parser for parsing form data
app.use(express.urlencoded({ extended: false }));
// Enables EJS Layouts middleware
app.use(ejsLayouts);
app.use('/', express.static(path.join(__dirname, 'public')));

// Adds some logging to each request
app.use(require('morgan')('dev')); ////???????????????? what is this

// Routes
app.get('/', function (req, res) {
  res.render('index');
});

app.get('/results', (req, res) => {
  const search = req.query.search;
  // Make a request for a user with a given ID
  axios.get(`http://www.omdbapi.com/?s=${search}&apikey=${process.env.API_KEY}`)
    .then(function (response) {
      const results = response.data.Search
      res.render('results', { results, search })
    })
    .catch((error) => {
      res.send(error);
    })
});

app.get('/movies/:imdbID', (req, res) => {
  const imdbId = req.params.imdbID;

  axios.get(`http://www.omdbapi.com/?i=${imdbId}&apikey=${process.env.API_KEY}`)
    .then(function (response) {
      const details = response.data;
      res.render('detail', { details })
    })
    .catch((error) => {
      res.send(error);
    })
});

// The app.listen function returns a server handle
const server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;