// Here we are creating the new database
const mongoose = require('mongoose');
// Defining the mongo connect URL
const connectonURL = 'mongodb://localhost:27017/waterreminder'
// Now we will establish the connection
mongoose.connect(connectonURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
// Connect
const database = mongoose.connection;
// Adding the event listner
database.on('connected',()=>{
    console.log('Connected to Mongodb server')
})
database.on('error',(err)=>{

    console.log('Error in connected to Mongodb server',err);
})
// Export the mongodb connection
module.exports = database;