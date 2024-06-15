const express = require('express');
const router = express.Router();
const walletschema = require('../models/wallet')

router.post('/walletget',async (req,res)=>{
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

module.exports=router;