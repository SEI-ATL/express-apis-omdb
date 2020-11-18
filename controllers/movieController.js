const fs = require('fs')
const movieRouter =require('express').Router()
const axios = require('axios');
////////////////////////////////
require('dotenv').config()
let string = 'http://www.omdbapi.com/?s=matrix&'


 const api=process.env.API
 function plusWord(string){
     let arr = string.split(' ')
     let newString = arr.join("+")
     return newString;
   
 }
 


movieRouter.get('/', (req, res) => {
   
    res.render('index', {rawTest})
   
  })

 movieRouter.get('/results', async function(req, res){
  
    const query = plusWord(req.query.q)
    await axios.get('http://www.omdbapi.com/?s='+query+'&'+api)
    .then(reso => {
       
        let obj = reso.data.Search
        console.log(obj)
        res.render('results', {obj});
    })
    .catch(err => {
        console.log(err);
    });
    
   
  })

  movieRouter.get('/:movie_id', async function(req, res){
    const movieId =req.params.movie_id;
    // const query = plusWord(req.query.q)
    await axios.get('http://www.omdbapi.com/?i='+movieId+'&'+api)
    .then(reso => {
       
        let obj = reso.data
        console.log(obj)
        res.render('detail', {obj});
    })
    .catch(err => {
        console.log(err);
    });
    
   
  })


let rawTest= "TEST"








module.exports = movieRouter