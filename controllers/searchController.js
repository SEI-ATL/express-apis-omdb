const fs = require('fs')
const searchRouter = require('express').Router()

// trying to test on local JSON data first
// searchRouter.get('/:title', (req, res) => {
//   const localMovies = fs.readFileSync('./movies-local.json')
//   const movies = JSON.parse(localMovies)
//   const title = req.params.title
//   console.log(title)
//   const movie = movies[0]
//   res.render('detail', { dino: movie.title })
// })

searchRouter.get('/results', (req, res) => {
  let movieTitle = req.query.title;
  // didn't realize axios had to be inside this!
  axios.get(`http://www.omdbapi.com/?t=${movieTitle}&apikey=${API_KEY}`, (res) => {
    let movieData = res.json.data;
  }).then((movieData) => {
    console.log(movieData.data.title);
    res.render('/results', {data: movieData.data});
  })
})


module.exports = searchRouter
