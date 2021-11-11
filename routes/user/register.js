// register route || Registration of a user 
// Importing the dependencies from node_module directory
const express = require('express');
const app = express();
const passport = require('passport');
const router = express.Router()

// Register @route
router.post('/registration', 
    passport.authenticate('local'),
    function(req, res){

        res.redirect('/users/'+req.user.username);
    }
)
module.exports = router;

