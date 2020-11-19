const express = require("express");
  const app = express();
  const axios = require("axios"); 
  const db = require('./models');
  require('dotenv').config();

  app.set("view engine", "ejs");
  app.use(express.static(process.env.STATIC_DIR || "public"));
  
  app.get("/", function(req, res){
      res.render("index")
  })
  app.use('/movies', require('./Controller/movieController'));

  
  app.listen(3000, () => {
      console.log("Movie App Has Started!!");
  })