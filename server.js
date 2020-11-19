require('dotenv').config();
const axios = require('axios')
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();

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
  const reqStr = `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${req.query.q}`
  
  axios.get(reqStr).then((response) => {
    console.log(response)
    res.render('results', { movies: response.data.Search });
  })
})

app.get('/movies/:imdbid', (req, res) => {
  const reqStr = `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${req.query.q}`
  
  axios.get(reqStr).then((response) => {
    res.render('detail', { details: response.data })
  })
})
// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;
