/*
----------------------------------------------------------------
----------------------------------------------------------------
|| Name       :      THIRD QUESTION IN MEARNSTACK             ||
|| From       :      HangingPanda Private Limited             ||
|| DEV        :      Pradip Golui                             ||
|| Tech. Used :      Nodejs, Expressjs, MongoDB               ||
|| Date       :      11-11-2021                               ||
----------------------------------------------------------------
---------------------------------------------------------------- 
                                                              */
// Basic server configuration using expressjs liabraries
// Importing the dependencies module from node_module directory
const express = require('express');
const app = express();
const router = express.Router();
const connectDB = require('./config/db');
const mongoose = require('mongoose');
const passport = require('passport');

// MongoDB connecting methed is here
// connectDB();
// Passport Config
require('./config/passport')(passport);

const db = require('./config/keys').mongoURI;

// Connecting to MongoDB Database to atlas
mongoose
  .connect(
    db,
    { useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// @Route : request & response from the client side 
app.get('/',(req, res) => res.send('API Running...'));


// Define environment Port for localhost that run local machine : client-server
const PORT = process.env.PORT || 5000;

// PORT is listened by the localhost at PORT || 5000
app.listen(PORT,() => console.log(`Server is running at localhost PORT || ${PORT} `));