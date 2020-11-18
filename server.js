require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const axios = require('axios').default;


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
  console.log('Hello');
});





app.get('/results', (req, res) => {
  

  // for (const key in req.query) {
  //   console.log(key, req.query[key])
  // }
  
  axios.get(`http://www.omdbapi.com/?apikey=${process.env.api}&s=${req.query.q}`)
  .then(function (response) {
    const movies = response.data.Search
    
    
    res.render('results', { movies })
  })
})

app.get('/movies/:movie_id', (req,res) => {
  const movie_id = req.params.movie_id
 

  axios.get(`http://www.omdbapi.com/?apikey=${process.env.api}&i=${movie_id}`)
  .then(function (response) {
    
    const movie = response.data

    res.render('detail', { movie })
  })
})
// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;

