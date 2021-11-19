/*
----------------------------------------------------------------
----------------------------------------------------------------             
|| Name       : Question 3                                    ||
|| Desc       : Login API In Question 3                    ||
----------------------------------------------------------------
---------------------------------------------------------------- 
                                                              */
// Importing the dependencies from node_modules directory
const express = require('express');
const router = express.Router();
const config = require('config');
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Importing the User models from models directory
const User = require('../../models/User');

// Declare Object arrays for validation using express.js 
const{ check , validationResult } = require('express-validator');


// @POST type route 
// Checking that user exixts or not in the database
// Taking email and password from postman side
// Varifying the user email address and password is correct or not


router.post('/',
    [
      check('email','Please enter a valid email address').isEmail(),
      check('password','Please enter correct password').exists()
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if(!errors.isEmpty()){
        res.status(400).json({errors: errors.array()});
      }

      const{email, password} = req.body;

      try
       {
          let user = await User.findOne({email});
          if(!user)
           {
             return res.status(400).json({errors:[{msg:'Invalid email or password || Enter the correct details'}]});
           }

           // Comparing the between user.password from user collection with user enter password from Postman
           const isMatch = await bcrypt.compare(password, user.password);

           // Here Checking password match or not  
           if(!isMatch)
            {
              return res.status(400).json({errors:[{msg:'Invalid Email or Password || Check'}]});
            }
            else{
                res.status(200).json('You are successfully login...');
                console.log('You are login...');
            }
       }
       catch(err)
        {
          console.error(err.message);
          res.status(500).send('Server error!')
        }
  });
module.exports = router;



