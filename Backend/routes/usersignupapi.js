const express = require('express');
const router = express.Router();
// We will import the schema of the signup
const signupschema = require('../models/usersignup');

// Creating the POST request for collecting the user data in the usersignupschema
router.post('/usersignupapi', async (req, res) => {
    try {

        const data = req.body;
        const user = await signupschema(data).save();

        console.log('Data is saved in the mongodb');
        res.status(200).json(user);
    }
    catch (err) {

        console.log(err);
        res.status(500).json({ err: 'Internal Server error' });
    }

})

// Creating the GET request for fetching the user data in the usersignupschema
router.get('/usersignupdetail', async (req, res) => {
    try {
        const userdetail = await signupschema.find();
        res.status(200).json(userdetail);
        console.log('Data Fetched');
    }
    catch(err){
        res.status(500).json({err:'Internal Server error'});
        console.log(err);
    }
})
// Creating the get request that will only give the username
try{
    router.get('/name',async(req,res)=>{
        const  name= await signupschema.find({},{username:1,_id:0});
        res.status(200).json(name);
        console.log(name);
    })
}
catch(err){
    console.log(err);
}
module.exports = router;