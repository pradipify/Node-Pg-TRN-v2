/*
----------------------------------------------------------------
----------------------------------------------------------------             
|| Name       : Question 3                                    ||
|| Desc       : Register & Login API In Question 3            ||
----------------------------------------------------------------
---------------------------------------------------------------- 
                                                              */
// Importing the dependencies from node_modules directory
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Importing User modele here
const User = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');

// @POST route for registration a user
// Checking and validating the data for correctness and valid data  
router.post('', (req, res) => {

  const { firstName, lastName,username,email, password, confrimPassword } = req.body;
  let errors = [];

  // Here checking all the field fill or empty with data
  if (!firstName || !lastName || !username || !email || !password || !confrimPassword) {
    errors.push({ msg: 'Please enter all fields' });
  }

  // Checking both password of confrim password same or not
  if (password != comfrimPassword) {
    errors.push({ msg: 'Passwords do not match' });
  }

  // Here checking that password length atleast 6 characters or not
  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }
// Checking if there any error in while registering the data
  if (errors.length > 0) {
    res.render('register', {
      errors,
      firstName,
      lastName,
      username,
      email,
      password,
      confrimPassword
    });
  } else {
      // Checking email exist in User database or 
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
            errors,
            firstName,
            lastName,
            username,
            email,
            password,
            confrimPassword
        });//Logou Handle
        router.get('/logout', (req, res)=>{
           req.logout();
           req.flash('success_msg', 'You are logged out');
           res.redirect('/users/login');
        });
        
      } else {

        // here creating User type instance for data save in the database
        const newUser = new User({
            firstName,
            lastName,
            username,
            email,
            password
        });
// Here encrypting the password using gensalt
// Hashing the 10 characters combination while encryption data password data
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.status(200).json('Success')

              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login Handle
router.post('/login', (req, res, next)=>{
   passport.authenticate('local',{
      successRedirect: '/welcome to home page',//Logou Handle
      router.get('/logout', (req, res)=>{
         req.logout();
         req.flash('success_msg', 'You are logged out');
         res.redirect('/users/login');
      });
      
    
   })(req, res, next);
});

module.exports = router;// // Login
  