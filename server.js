require('dotenv').config();
const db = require('./models')
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const movieRouter = require("./controllers/movieController")
// Sets EJS as the view engine
app.set('view engine', 'ejs');
// Specifies the location of the static assets folder
app.use(express.static('static'));
// Sets up body-parser for parsing form data
app.use(express.urlencoded({ extended: false }));
// Enables EJS Layouts middleware
app.use(ejsLayouts);
const axios = require('axios');
// Adds some logging to each request
app.use(require('morgan')('dev'));

// Routes
app.get('/', function(req, res) {

  res.send('hey!');
});

app.use('/movies', movieRouter)
// The app.listen function returns a server handle
app.get('/faves', function (req, res){
  let faves;
  db.fave.findAll().then(allUsers =>{
    allUsers.get();
    faves = allUsers;
    return faves;
  })
  console.log(faves)

  
  res.render('faves', {faves})
});


  
  
  

var server = app.listen(process.env.PORT || 3000);
 


// We can export this server to other servers like this
module.exports = server;
