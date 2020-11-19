const db = require('../models')
const fs = require('fs')
const movieRouter =require('express').Router()
const axios = require('axios');
const { getPriority } = require('os');
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
       
        res.render('detail', {obj});
    })
    .catch(err => {
        console.log(err);
    });
    
   
  })

  movieRouter.post('/:movie_id', (req,res) => {
      db.fave.create({
        title: req.body.title,
        imbid: req.body.imbid
      }).then((createdFave)=> {res.redirect('/faves')})

      })
        


let rawTest= "TEST"








module.exports = movieRouter