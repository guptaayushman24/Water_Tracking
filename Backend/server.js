// Creating the server for the app
const express = require('express');
const app = express();
<<<<<<< HEAD
const database = require('./database')

app.post('/',(req,res)=>{
    res.send('Hello')
})
=======
const database = require('./database');
const router = require('./route');

app.use(router)
>>>>>>> 8689cbe (Checking of the API)
// Creating the lister where server will run
app.listen(5000,()=>{
    console.log('Server is running on the local host 5000');
})
<<<<<<< HEAD
=======


// server->route->Apifolder(api folder is also called as controller)(apis will be run)
>>>>>>> 8689cbe (Checking of the API)
