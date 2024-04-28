const mongoose = require('mongoose');
const usersignupschema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
},{timestamps:true})
const signupschema = usersignupschema;

module.exports = signupschema;