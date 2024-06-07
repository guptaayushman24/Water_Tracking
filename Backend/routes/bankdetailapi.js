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

router.get('/bankdetailget',async(req,res)=>{
   try{
      const data = await bankdetailschema.find({},{accountnumber:1,_id:0});
      res.status(200).json(data);
      console.log(data);
   }
   catch(err){
      res.status(500).json({err:'Internal Server Error'});
      console.log(err);
   }
})
router.get('/bankdetailgetamount',async(req,res)=>{
   try{
      const data = await bankdetailschema.find({},{amountlength:1,_id:0});
      res.status(200).json(data);
      console.log(data);
   }
   catch(err){
      res.status(500).json({err:'Internal Server Error'});
      console.log(err);
   }
})

router.post('/bankdetailupdate',async (req,res)=>{
   const { accountnumber, amountlength } = req.body;
   try{
      const response = await bankdetailschema.updateOne(
         { accountnumber: accountnumber }, // Query to match the name
         { $set: { amountlength: amountlength } } // Update the bankname field
       );
       if (response.nModified === 0) {
         res.status(404).send('No document found with the specified name');
       } else {
         res.status(200).send('Update successful');
       }

       console.log(response);
   }
   catch(err){
      console.log(err);
   }
})

module.exports = router;