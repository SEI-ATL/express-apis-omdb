require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();

let movieController = require('./controllers/movieController');

app.use('/', movieController);

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

// Home route
app.get('/', function (req, res) {
  res.send('This is the home page.');
});

// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000, () => {
  console.log('The server is up and running!');
});

// We can export this server to other servers like this
module.exports = server;