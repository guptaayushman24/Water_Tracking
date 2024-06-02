const mongoose = require('mongoose');
const detail = new mongoose.Schema({
bankname:{
    type:String,
    require:true
},
accountnumber:{
    type:Number,
    require:true
},
signupemail:{
    type:String,
    require:true
},
cardnumber:{
    type:Number,

    require:true
},
amountlength:{
    type:Number,

    require:true
},
},{timestamps:true})
const bankdetails = mongoose.model('bankdetails',detail);
module.exports = bankdetails;