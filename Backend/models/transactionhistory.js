const mongoose = require('mongoose');
const transactionmodel = new mongoose.Schema({
    SenderEmail:{
        type:String,
        require:true
    },
    RecieverEmail:{
        type:String,
        require:true
    },
    AmountRecieved:{
        type:Number,
        require:true,
    }
},{require:true});
const transaction = mongoose.model('transaction',transactionmodel);

module.exports = transaction;