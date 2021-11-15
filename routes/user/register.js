// register route || Registration of a user 
// Importing the dependencies from node_module directory
const express = require('express');
const app = express();
const passport = require('passport');
const router = express.Router()

// Register @route
router.post('/',(req, res)=>{
    const{firstName, lastName,username, email, password, confrimPassword}= req.body;
    console.log(req.body);
    res.send(req.body);

});
module.exports = router;

