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
// @Route : request & response from the client side 

const express = require('express');
const connectDB = require('./config/db');
const path =require('path');
const router = express.Router();
const bcrypt = require('bcryptjs');
const app = express();

// MongoDB connection method here
connectDB();

// Middleware || Body-Parser use
app.use(express.json({exetended:false}));

// Importing the APIs here for use
app.use('/user/register', require('./routes/user/register'));
app.use('/user/login', require('./routes/user/login'));
//app.use('/user/login2', require('./routes/user/login2'));

// Define environment Port for localhost that run local machine : client-server
const PORT = process.env.PORT || 5000;

// PORT is listened by the localhost at PORT || 5000
app.listen(PORT,() => console.log(`Server is running at localhost PORT || ${PORT} `));