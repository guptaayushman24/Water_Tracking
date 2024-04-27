// Creating the server for the app
const express = require('express');
const app = express();
const database = require('./database')

app.post('/',(req,res)=>{
    res.send('Hello')
})
// Creating the lister where server will run
app.listen(5000,()=>{
    console.log('Server is running on the local host 5000');
})
