const fs = require('fs')
const movieRouter = require('express').Router()

movieRouter.get('/', (req, res) => {
    res.render('index')
})

module.exports = movieRouter