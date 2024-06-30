const mongoose = require('mongoose');
const transactionmodel = new mongoose.Schema({
    Senderemail:{
        type:String,
        require:true
    },
    AmountRecieved:{
        type:Number,
        require:true,
    }
},{require:true});
const transaction = mongoose.model(transaction,transactionmodel);
module.exports = transaction;