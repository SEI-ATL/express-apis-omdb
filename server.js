require('dotenv').config();
const express = require('express');
//var request = require('request');
const axios = require('axios').default;
const ejsLayouts = require('express-ejs-layouts');
const path = require('path'); // for path

const app = express();

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
  const query = req.query.q;
  // Make a request for a user with a given ID
  axios
    .get(`https://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${query}`)
    .then((response)=> {
      // handle success
      //res.send(response.data.Search)
      const title = `${response.data.Search.length} Matches Found for '${query}'`;
      res.render('results', {
        title,
        results: response.data.Search,
      });
    })
    .catch((error) => {
      res.redirect('index');
      console.log(error);
    });
});

app.get('/movies/:movie_id', (req, res) => {
  const movieid = req.params.movie_id;

  axios
    .get(`https://www.omdbapi.com/?apikey=${process.env.API_KEY}&i=${movieid}`)
    .then((response) => {
      const title = `Movie Details: ${movieid}`;
      const excludeKey = ['Poster', 'Ratings', 'Response'];

      const filterData = Object.keys(response.data).reduce((result, k) => {
        if (!excludeKey.includes(k)) {
          result[k] = response.data[k];
        }
        return result;
      }, {});

      console.log(filterData);

      const star = '⭐';
      const rating = star.repeat(Math.floor(response.data.imdbRating));
      res.render('detail', {
        title,
        details: filterData,
        rating,
        poster: response.data.Poster,
      });
    })
    .catch((error) => {
      res.redirect('index');
      console.log(error);
    });
});

// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;
