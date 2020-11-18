const { default: Axios } = require('axios')
const fs = require('fs')

const movieRouter = require('express').Router()

movieRouter.get('/', (req, res)=>{
    res.render('index')
})

movieRouter.get('/results', (req, res)=>{
    const mySearch = req.query.title;
    console.log(mySearch)
    Axios.get( `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${mySearch}`)
    .then ((response) => { res.render('results'), {movies: response.data.Search}
    })
    .catch((error)=> {
        console.log(error);
    });
});


module.exports = movieRouter;