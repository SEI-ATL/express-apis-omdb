require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const axios = require('axios')


const app = express();
const { API_KEY: apikey } = process.env

if (!process.env.API_KEY) {
  console.warn('WARNING: APP WILL FAIL WITHOUT OMDB API KEY!')
  console.log('Create .env file and add api key using format "API_KEY=<your key>"')
}

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
app.get('/', function (_, res) {
  res.render('index');
})

app.get('/results', (req, res) => {
  const s = req.query.q
  const qs = { params: { s, apikey } }

  axios.get(`http://www.omdbapi.com/`, qs)
    .then(({ data: { Search } }) => {
      const movies = Search
        .filter(query => query.Type === 'movie')
        .sort((a, b) => parseInt(a.Year) - parseInt(b.Year))

      res.render('results', { movies })
    }).catch(e => { console.error(e) })
})

app.get('/movies/:movieId', (req, res) => {
  const { movieId: i } = req.params
  const qs = { params: { i, apikey } }

  axios.get('http://www.omdbapi.com', qs)
    .then(({ data }) => {
      const details = data

      res.render('detail', { details })
    })
})

// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on http://localhost:${process.env.PORT || 3000}`)
});

// We can export this server to other servers like this
module.exports = server;
