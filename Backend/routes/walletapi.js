const express = require('express');
const router = express.Router();
const walletschema = require('../models/wallet');
const { default: mongoose } = require('mongoose');

router.post('/walletpost',async (req,res)=>{
    try{
        const data = req.body;
        const response = await walletschema(data).save();
        res.status(200).json(response);
        console.log(response);

    }
    catch(err){
        res.status(500).json({'err':'Internal Server error'});
    }

})

router.put('/walletupdate',async(req,res)=>{
    const {email,amountadded} = req.body;
    try{
        const response = await walletschema.updateOne(
           { email: email }, // Query to match the name
           { $set: { amountadded: amountadded } } // Update the bankname field
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

router.get('/walletamountget',async(req,res)=>{
    try{
       const data = await walletschema.find({},{amountadded:1,_id:0});
       res.status(200).json(data);
       console.log(data);
    }
    catch(err){
       res.status(500).json({err:'Internal Server Error'});
       console.log(err);
    }
 })
 router.get('/walletemailget',async(req,res)=>{
  try{
     const data = await walletschema.find({},{email:1,_id:0});
     res.status(200).json(data);
     console.log(data);
  }
  catch(err){
     res.status(500).json({err:'Internal Server Error'});
     console.log(err);
  }
})



module.exports=router;