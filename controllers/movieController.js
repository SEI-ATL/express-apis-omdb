const axios = require('axios').default
const fs = require('fs')

const movieRouter = require('express').Router()

movieRouter.get('/', (req, res)=>{
    res.render('index')
})

movieRouter.get('/results', (req, res)=>{
    const mySearch = req.query.title;
    console.log(mySearch)
    axios.get( `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${mySearch}`)
    .then ((response) =>
     {
         console.log(response.data.Search);
         const myResults = response.data.Search
        res.render('results', { title: mySearch, myResults })
    })
    .catch((error)=> {
        console.log(error);
        res.render('results', { title: mySearch, })
    });
});

movieRouter.get('/movies/:movie_id', (req, res)=>{
    const myID = req.params.movie_id;
    console.log(myID)
    axios.get( `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${myID}`)
    .then ((response) =>
     {
         console.log(response.data);
         const myDetails = response.data
        res.render('detail', { title: myDetails })
    })
    .catch((error)=> {
        console.log(error);
        res.render('detail', { title: myDetails, })
    });
});


module.exports = movieRouter;