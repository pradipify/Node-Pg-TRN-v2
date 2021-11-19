/*
----------------------------------------------------------------
----------------------------------------------------------------             
|| Name       : Question 3                                    ||
|| Desc       : Passportjs authentication                     ||
----------------------------------------------------------------
---------------------------------------------------------------- 
                                                              */
// Importing the dependencies from node_modules directory
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//Here importing the user Data model
const User = require('../models/User');

// Importing the passport modules
// passport pass as function 
module.exports = function(passport){
     passport.use(
         new LocalStrategy({ usernameField: 'email'},(email, password, done)=>{
             
            // Here matching the user form existing user emaill address
            User.find({email:email})
            .then(user=>{
                if(!user){
                    return done(null, false, {message:'That email is not registered'});
                }
                //  Checking the matching the password using compare method of gensalt
                bcrypt.compare(password, user.password, (err, isMatch)=>{
                    if(err) throw err;

                    if(isMatch){
                        return done(null, user);
                    }else{
                        return done(null, false, {message: 'Password is incorrect'});
                    }
                });
            })
            .catch(err =>console.log(err));
         })
     );
     // Here use serialization for session for each session after a succesful logged user
         passport.serializeUser(function(user, done){
             done(null, user.id);
         });
// Here use deserialization for session for each session after a succesful logged user
         passport.deserializeUser(function(id, done){
             User.findById(id, function(err, user){
                 done(err, user);
             })
         });

}