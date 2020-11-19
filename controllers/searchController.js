const fs = require('fs')
const searchRouter = require('express').Router()
const axios = require('axios')

// trying to test on local JSON data first
// searchRouter.get('/:title', (req, res) => {
//   const localMovies = fs.readFileSync('./movies-local.json')
//   const movies = JSON.parse(localMovies)
//   const title = req.params.title
//   console.log(title)
//   const movie = movies[0]
//   res.render('detail', { dino: movie.title })
// })

const api = process.env.API

searchRouter.get('/', (req, res) => {
  res.render('movies/index');
})

searchRouter.get('/results', (req, res) => {
  let TITLE = 'matrix';
  // didn't realize axios had to be inside this!
  axios.get(`http://www.omdbapi.com/?t=${TITLE}&apikey=${API_KEY}`, (res) => {
  }).then((response) => {
    const movieData = {title: res.data.title};
    res.render('movies/results/', movieData);
  })
})

module.exports = searchRouter
