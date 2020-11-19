const express = require('express');
const app = express();
const layouts = require('express-ejs-layouts');
const fetch = require("node-fetch");
const dotenv = require('dotenv').config();

const movieRouter = require('./controllers/movieController')
api_key = process.env.api_key

// console.log(process.env); 

app.set('view engine', 'ejs')
app.use(layouts)
app.use(express.urlencoded({extended: false}))


app.get('/', function(req, res){
    res.render('')
})

app.use('/movies', movieRouter)

app.listen(8001, () => {
    console.log('server started!')
})
