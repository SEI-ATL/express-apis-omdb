require('dotenv').config();
const {API_KEY} = process.env;
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const axios = require('axios').default;
const db = require('./models')


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
    axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${req.query.title}`).then(function (response) {
      const movies = response.data.Search
      // console.log(movies);
      res.render('results', { movies });
    }).catch(error => console.log(error))
  })
  
  app.get('/movies/:movie_id', (req, res) => {
    //always log req to find data
    // console.log(req);
    const imdb = req.params.movie_id
    axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${imdb}`).then(function (response) {
      
      const movieTitle = response.data
      // console.log(movieTitle);
      res.render('detail', { movieTitle });
    }).catch(error => console.log(error))
  })

  app.post('/faves', (req, res) => {
      // console.log(req);
      db.fave.create({
      title: req.body.title,
      imdbid: req.body.imdbid
    }).then(() => {
      res.redirect('/faves')
    })
  })
  
  app.get('/faves', (req, res) => {
    db.fave.findAll().then(allFaves => {
      res.render('faves', { allFaves })
    })
  })
    

    

// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000, console.log('in the matrix'));

// We can export this server to other servers like this
module.exports = server;
