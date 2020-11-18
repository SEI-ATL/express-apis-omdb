const { default: Axios } = require('axios');
const API_KEY = '9db3ace8'

const movieRouter = require('express').Router()


movieRouter.get('/', (req, res) => {
    res.render('index')
})

movieRouter.get('/results', (req, res) => {
    res.render('results', { title: req.query.title });
    let searchQ = req.query.title
    axios.get(`http://www.omdbapi.com/?t=${searchQ}&apikey=${API_KEY}`, (res) => {
        let movieValues = res.json.data;
    }).then((movieValues) => {
        res.render('results', {data: movieValues.data})
    });
})



module.exports = movieRouter