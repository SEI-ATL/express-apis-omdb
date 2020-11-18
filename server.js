require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const KEY = process.env.API_KEY
const axios = require('axios').default


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
app.get('/results',(req,res)=>{
  let searchQuery = req.query.search
  console.log(searchQuery);
  async function exercise2(){
    try{
      console.log('I should be before')
      const res1 = await axios.get(`http://www.omdbapi.com/?s=${searchQuery}}&apikey=${KEY}`)
      const json1 = await res1.data.Search
      // `https://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&?type=${searchQuery}`
      console.log('this is the movie data',json1);
      res.render('results', { json1 })

    }
    catch(e){
      console.log(e);
    }
  }
  exercise2()
})

app.get('/movie',(req,res)=>{
  let searchQuery = req.query.imdbID
  console.log(typeof searchQuery);
  
  async function exercise2(){
    try{
      console.log('I should be before')
      const res1 = await axios.get(`http://www.omdbapi.com/?i=${searchQuery}&apikey=${KEY}`)
      const json2 = await res1.data
      // `https://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&?type=${searchQuery}`
      console.log('this is the movie data',json2);
      res.render('detail', { json2 })

    }
    catch(e){
      console.log(e);
    }
  }
  exercise2()
})


// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;

