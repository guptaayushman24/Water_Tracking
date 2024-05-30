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
accountholderemail:{
    type:String,
    require:true
},
totalamount:{
    type:Number,

    require:true
},
withdraamount:{
    type:Number,
    require:true
}
},{timestamps:true})
const bankdetails = mongoose.model('bankdetails',detail);
module.exports = bankdetails;