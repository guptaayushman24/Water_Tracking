const express = require('express');
const router = express.Router();
const bankdetailschema = require('../models/bankdetails');

router.post('/bankdetail',async(req,res)=>{
   try{
    const data = req.body;
    const user = await bankdetailschema(data).save();
    res.status(200).json(user);
    console.log(user);
   }
   catch(err){
    res.status(500).json({err:'Internal Server Error'});
    console.log(err);
   }
})

module.exports = router;