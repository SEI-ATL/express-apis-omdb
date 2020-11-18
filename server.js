require('dotenv').config()
const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const app = express()
const axios = require('axios').default

// Sets EJS as the view engine
app.set('view engine', 'ejs')
// Specifies the location of the static assets folder
app.use(express.static('static'))
// Sets up body-parser for parsing form data
app.use(express.urlencoded({ extended: false }))
// Enables EJS Layouts middleware
app.use(ejsLayouts)

// Adds some logging to each request
app.use(require('morgan')('dev'))

// Routes
app.get('/', (req, res) => {
    res.render('index')
})

app.get('/results', (req, res) => {
    const query = req.query.q
    axios
        .get(`https://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${query}`)
        .then((response) => {
            const title = `${response.data.Search.length} Matches for '${query}'`
            res.render('results', { title, results: response.data.Search })
        })
        .catch((error) => {
            res.send('Search could not be completed')
        })
})

// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000)

// We can export this server to other servers like this
module.exports = server