const express = require('express');
const app = express();
const layouts = require('express-ejs-layouts');
const fetch = require("node-fetch");
const dotenv = require('dotenv').config();
const search = 'godfather';
api_key = process.env.api_key

console.log(process.env); 

fetch(`http://www.omdbapi.com/?apikey=${api_key}&s=${search}`)
    .then(response => response.json())
    .then(response => console.log(response))
