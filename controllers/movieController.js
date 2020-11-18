const movieRouter = require('express').Router();


//routes
movieRouter.get('/', (req, res) => {
    res.render('index');
});

movieRouter.get('/results', (req, res) => {
    console.log(req.query);
    res.render('results', { title: req.query.title });
});



module.exports = movieRouter;