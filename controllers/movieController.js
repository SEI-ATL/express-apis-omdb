const { default: Axios } = require('axios')
const fs = require('fs')

const movieRouter = require('express').Router()

movieRouter.get('/', (req, res)=>{
    res.render('movies/index')
})

movieRouter.get('/:title', (req, res)=>{
    const mySearch = req.body.title;
    Axios.get( `http://www.omdbapi.com/?i=${mySeatch}&apikey=${process.env.API_KEY}`)
    .then ((response) => {
        res.render('movies/results'), 
        {movies: response.data.Search}
    })
    .catch((error)=> {
        console.log(error);
    })
});


module.export = movieRouter