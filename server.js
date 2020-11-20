require('dotenv').config();
const express = require('express');
//var request = require('request');
const axios = require('axios').default;
const ejsLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');

//my db
const db = require('./models');

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
app.use(methodOverride('_method'))

// Adds some logging to each request
app.use(require('morgan')('dev')); ////???????????????? what is this

////////////////// ROUTES ///////////////////////////////
// main index route
app.get('/', function (req, res) {
  res.render('index');
});

// CREATE THE RESULTS ROUTE
app.get('/results', (req, res) => {
  const query = req.query.q;
  // Make a request for a user with a given ID
  axios
    .get(`https://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${query}`)
    .then((response) => {
      // handle success
      //res.send(response.data.Search)
      const title = `${response.data.Search.length} Matches Found for '${query}'`;
      res.render('results', {
        title,
        results: response.data.Search,
      });
    })
    .catch((error) => {
      res.redirect('/');
      console.log('error', error);
    });
});

// CREATE THE DETAILS ROUTE USING PARAMS
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
      res.redirect('/');
      console.log(error);
    });
});

// CREATE THE FAVES ROUTE
// THAT RENDERS ALL THE DATA IN THE DB
app.get('/faves', (req, res) => {
  const allfaves = [];

  db.fave.findAll().then((all) => {
    //all executions have to done in .then
    // after finding all, push eaeach to an array
    // this will be an array of objects
    // that is passed into the faves route to be rendered
    all.forEach((fave) => {
      allfaves.push(fave.get());
    });
    res.render('faves', { title: 'Favorites', allfaves });
  });
});

// CREATE THE POST ROUTE
// its directed here from the details form
// the title + imdbid are passed in through the body

app.post('/', (req, res) => {
  const fave = req.body;
  // const fave_title = req.body.title;
  const fave_imdbid = req.body.imdbid;

  // first do a search of all of the imdbid to check if its in the table
  // this will return an array/obj
  db.fave
    .findAll({
      where: { imdbid: fave_imdbid },
    })
    // if the returned element is empty (false)
    // then add a new entry to the table with req.body
    // all executions have to be done in the then because its a promise
    .then((results) => {
      if (!results.length) {
        db.fave.create(
          // since req.body is already an object containing the needed k:v pairs, just pass that
          req.body
          //{title: fave_title, imdbid: fave_imdbid}
        );
      }
      res.redirect('/faves'); // this has to be within the .then bc promise
    });
});

app.delete('/', (req, res) => {
  console.log('im trying to delte');

  db.fave
    .truncate({ restartIdentity: true })
    .then(() => {
      res.redirect('/faves');
    })
    .catch((error) => {
      res.redirect('/');
      console.log(error);
    });
});

// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;

//dont forget to install pg and sequelize
// sequelize init
// set up config file to use sequlize across all environments

// sequelize db: create ___________
//create fields (be careful of spaecs)
//sequelize model:create --name user --attributes firstName:string,lastName:string,age:integer,email:string
//

//sequelize db:migrate

// creating a model
// a model is a schema with a table we're creating w/ field names
