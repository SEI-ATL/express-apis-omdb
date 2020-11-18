const { default: Axios } = require('axios')
const fs = require('fs')

const movieRouter = require('express').Router()

movieRouter.get('/', (req, res)=>{
    res.render('movies/index')
})

movieRouter.get('/results', (req, res)=>{
    const mySearch = req.body.title;
    Axios.get( `http://www.omdbapi.com/?i=${mySeatch}&apikey=${process.env.API_KEY}`)
    .then ((response) => {
        res.render('results'), 
        {movies: response.data.Search}
    })
    .catch((error)=> {
        res.send(error);
    })
});


module.export = movieRouter