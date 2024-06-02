const mongoose = require('mongoose');
const signupmodel = new mongoose.Schema({
    username:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        unique:true,
        require:true
    },
    password:{
        type:String,
        require:true,
    },
},{timestamps:true})


const signup = mongoose.model('signup',signupmodel);
module.exports = signup;