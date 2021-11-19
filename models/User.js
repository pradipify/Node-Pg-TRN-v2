// Defining User model for user data collections
// Importing dependencies from node__module
const mongoose = require('mongoose');

// Defining User model schema
const UserSchema = new mongoose.Schema({
   firstName: {
       type: String,
       required: true
   },
   lastName: {
       type: String,
       required: true
   },
   username:{
       type:String,
       required:true,
       unique:true
   },
   email:{
       type:String,
       required:true,
       unique:true
   },
   password:{
       type:String,
       required:true
   },
   date:{
       type: Date,
       default:Date.now
   }
}); 

const User = mongoose.model('User', UserSchema);
module.exports = User;