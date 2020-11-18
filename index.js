const express = require('express');
const app = express();
const layouts = require('express-ejs-layouts');

app.set('view engine', 'ejs');
app.use(layouts);

app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(8000, () => {
    console.log('server started')
})