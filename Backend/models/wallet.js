const mongoose = require('mongoose');
const wallet = new mongoose.Schema({
    email:{
        type:String,
        require:true
    },
    amountadded:{
        type:Number,
        require:true

    }
},{timestamps:true})
const walletschema = mongoose.model('walletschema',wallet);
module.exports = walletschema;