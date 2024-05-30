const mongoose = require('mongoose');
const detail = new mongoose.Schema({

},{timestamps:'true'})
const bankdetails = mongoose.model('bamkdetails',detail);
module.exports = bankdetails