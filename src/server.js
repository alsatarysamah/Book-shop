'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Esoteric Resources
const errorHandler = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404.js');
const authRoutes = require('./auth/router/index.js');
const bookRoutes=require("../src/auth/router/book")
const itemRoutes=require("../src/auth/router/item")
const catRouter =require("../src/auth/router/cat")
const productRouter =require("../src/auth/router/product")
// Prepare the express app
const app = express();
app.get("/",(req,res)=>{
  res.send("Home");
})

// App Level MW
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(authRoutes);
app.use(bookRoutes);
app.use(itemRoutes);

app.use(catRouter);
app.use(productRouter);

// Catchalls
app.use(notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  startup: (port) => {
    app.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
};
