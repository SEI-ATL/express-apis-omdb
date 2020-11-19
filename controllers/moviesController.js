const { response } = require('express');
const axios = require('axios')
const movieRouter = require('express').Router()
const db = require('../models')

movieRouter.get('/', (req,res)=>{
    res.render('movies/index')
})


movieRouter.get('/title',(req,res)=>{
    const searchTerm= req.query.title;
    console.log(searchTerm);
    axios.get(`http://www.omdbapi.com/?s=${searchTerm}&apikey=${process.env.API_KEY}`)
    .then((response)=>{
        res.render('movies/results', {movies:response.data.Search}) 
    })
})



movieRouter.get('/detail/:id', (req, res) => {
    const searchTerm = req.params.id;
    axios
    .get(
        `http://www.omdbapi.com/?i=${searchTerm}&apikey=${process.env.API_KEY}`
        )
        .then((response) => {
            res.render('movies/detail', { movies: response.data })
            // console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
});


movieRouter.post('/faves',(req,res)=>{ 
    console.log(req.body.title)
    db.fave.create({
        title: req.body.title,
        imdbid: req.body.imdbid,

    }).then(() => {
        res.redirect('/movies/faves')
    })
})

movieRouter.get('/faves', function (req, res){
    db.fave.findAll().then(allFaves => {

        res.render('/movies/faves', {allFaves})
        console.log(allFaves)

    })
})

movieRouter.get

module.exports = movieRouter