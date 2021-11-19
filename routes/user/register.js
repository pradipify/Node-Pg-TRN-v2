/*
----------------------------------------------------------------
----------------------------------------------------------------             
|| Name       : Question 3                                    ||
|| Desc       : Register API In Question 3                    ||
----------------------------------------------------------------
---------------------------------------------------------------- 
                                                              */
// Importing the dependencies from node_modules directory
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');

// Importing the User models from models directory
const User = require('../../models/User');

// Checking correctness of data & validating them
const {check,validationResult} = require('express-validator');

// Conditions checking and errors message generate for false conditions

router.post('/',
[
    check('firstName','Pleae enter the first name').not().isEmpty(),
    check('lastName','Pleae enter the last name').not().isEmpty(),
    check('username','Pleae enter the correct username ').not().isEmpty(),
    check('email','Please enter a valid email address').isEmail(),
    check('password','Please enter a valid password with 6 or more than 6 characters').isLength({min:6}),
    check('confrimPassword','Pleae enter the first name').not().isEmpty(),
],

// Validation check if here any errors are find
async (req,res) =>
       {
         const errors = validationResult(req);
         if(!errors.isEmpty()){
         return res.status(400).json({ errors: errors.array() });
       }

    // Collecting the data from Postman in json format with following field key-values pair on the basis User model as require
    const{firstName,lastName,username,email,password,confrimPassword } = req.body;

    //Checking user exist or not by using existing usernames in the database
    try
    {
        let user = await User.findOne({email});
     // If user exist show status
        if(user)
            res.status(400).json({errors:[{msg:'User Already exist'}] });

        // Create user type of object to storing users collection in the database
        user = new User(
            {
              firstName,
              lastName,
              username,
              email,
              password,
            });

    // Encrypting the password by using genSalt
     const salt = await bcrypt.genSalt(10);

     // Encrypting the password using hashing using genSalt
     user.password = await bcrypt.hash(password,salt);

     // Checking password or confrimPassword are same
     if(password === req.body.confrimPassword)
      {
         await user.save();
         res.send('User has been registered');
         console.log(user);
      }

      // // Defining Payload object for containing user data in authentication time to send back to fronted side
      // const payload = {
      //   user:{
      //     id: user.id
      //   }
      // }

      // Here accessing the json web token from default.json in confid directory
      // Set time for token expire after login a user or logged how much time with this token
    //   jwt.sign(
    //     payload,
    //     config.get('jwtToken'),
    //     {expiresIn :3600},
    //     (err, token) =>{
    //       if(err) throw err;
    //       res.json({token});
    //     }
    //   );
  }
    catch(err)
      {
         console.error(err.message);
         res.status(500).send('Server error');
      }
    });
module.exports = router;
