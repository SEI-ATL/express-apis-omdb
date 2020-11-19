require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const axios = require('axios')
const apiKey = '9db3ace8'
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
  let search = req.query.q;
  axios.get(`http://www.omdbapi.com/?s=${search}&apikey=${apiKey}`)
      .then((searchResults) => {
          let results = searchResults.data.Search;
          res.render('results', { results, search });
      })
})


app.get('/movies/:imdbid', (req, res) => {
  axios.get(`http://www.omdbapi.com/?i=${req.params.imdbid}&apikey=${apiKey}`)
      .then((data) => {
          let movie = data.data;
          res.render('detail', { movie });
      })
})
app.post('/faves', (req, res) => {
  db.fave.create(req.body).then((createdFave) => {
    res.redirect('/faves')
  })
})
app.get('/faves', (req, res) => {
  db.fave.findAll().then((foundFaves) => {
    res.render('faves', { faves: foundFaves })
  })

})





// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;
