
require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const axios = require('axios');
const searchRouter = require('./controllers/searchController')
// const favesRouter = require('./controllers/favesController')
const db = require('./models');
// const dinoRouter = require('express').Router()

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

app.use('/results', searchRouter);
// Routes
app.get('/', (req, res) => {
  res.render('./index');
});
app.get('/movies/:movie_id', (req, res) => {
  res.render('./detail');
})

app.get('/faves', (req, res) => {
  res.render('./faves');
})

db.fave.create({
  id: 1, // how to grab this from the HIDDEN output of the EJS form // res.data.id?
  title: '', // how to grab this from the RESULT of the title search. This is the entrance (JOIN)
  imdbid: '' // grab this from the RESULT  // res.data.imdbid?
}).then(createdFave => {
  console.log(createdFave);
  res.redirect() // to where?
})

db.fave.findAll().then(allFaves => {
   // res.render('./faves'); or does this go in the function above?
})
//   console.log(allUsers[0].get());
// });

// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;
