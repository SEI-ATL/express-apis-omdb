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
     console.log(newString)
 }
 


movieRouter.get('/', (req, res) => {
   
    res.render('index', {rawTest})
   
  })

 movieRouter.get('/results', async function(req, res){
   
    const query = plusWord(req.query.q)
   
    await axios.get('http://www.omdbapi.com/?s='+query+'&'+api)
    .then(res => {
        // console.log(res);
       console.log(Object.keys(res));
    })
    .catch(err => {
        console.log(err);
    });
    res.render('results')
  })



let rawTest= "TEST"








module.exports = movieRouter