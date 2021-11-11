// Database connectivity with using mongoose libraries of MongoDB 
// Here we use our database from MongoDB Atlas Cloud Platform Database
// Importing the mongoose & config dependencies from node_module directory form connection
const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

// Defining the exception or errors handling bloch here for handle when they occured during the connectivity with database
const connectDB = async () =>
{
    try
    {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology:true
        })
        console.log('MongoDB connected...');
    }
    catch(err)
    {
        console.error(err.message);
        process.exit(1);
    }
};
module.exports = connectDB;
