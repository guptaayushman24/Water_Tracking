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
       )
    }
    catch(err){
        console.log(err);
    }
})
module.exports=router;