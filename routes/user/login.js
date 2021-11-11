// login @route || Login of existing user 
// Importing the dependencies from node_module directory
const express = require('express');
const app = express();
const passport = require('passport');
const router = express.Router();

// Login @route
app.post('/login', 
    passport.authenticate('local'),
    function(req, res){

        res.redirect('/users/'+req.user.username);
    }
)

module.exports = router;
