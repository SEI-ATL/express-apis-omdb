require('dotenv').config();
const express = require('express');
const axios = require('axios').default;
const ejsLayouts = require('express-ejs-layouts');
const path = require('path'); 
const db = require('./models');

const app = express();

// Sets EJS as the view engine
app.set('view engine', 'ejs');

app.use(express.static('static'));

app.use(express.urlencoded({ extended: false }));
// Enables EJS Layouts middleware
app.use(ejsLayouts);
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(require('morgan')('dev')); 


// Routes


app.get('/', function (req, res) {
  res.render('index');
});

app.get('/results', (req, res) => {
  const query = req.query.q;
  // Make a request for a user with a given ID
  axios
    .get(`https://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${query}`)
    .then(function (response) {
 
      const title = `${response.data.Search.length} Matches Found for '${query}'`;
      res.render('results', {
        title,
        results: response.data.Search,
      });
    })
    .catch((error) => {
      res.send('Bad Search');
      console.log(error);
    });
});
app.get('/movies/:movie_id', (req, res) => {
  const movieid = req.params.movie_id;
  axios
    .get(`https://www.omdbapi.com/?apikey=${process.env.API_KEY}&i=${movieid}`)
    .then(function (response) {
      const title = `Movie Details: ${movieid}`;

      const star = "*";
      const rating = star.repeat(Math.floor(response.data.imdbRating));
      res.render('detail', { title, details: response.data, rating});
      console.log(response.data);
    })
    .catch((error) => {
      res.send('Error');
      console.log(error);
    })
});

app.get('/faves', (req, res) => {
  const allfaves = [];

  db.fave.findAll().then((all) => {

    all.forEach((fave) => {
      allfaves.push(fave.get());
    });
    res.render('faves', { title: 'Favorites', allfaves });
  });
});

// CREATE THE POST ROUTE

app.post('/', (req, res) => {
  const fave = req.body;
  const fave_imdbid = req.body.imdbid;

  db.fave
    .findAll({
      where: { imdbid: fave_imdbid },
    })
    .then((results) => {
      if (!results.length) {
        db.fave.create(
          req.body
        );
      }
      res.redirect('/faves'); 
    });
});


var server = app.listen(process.env.PORT || 3000);

module.exports = server;




