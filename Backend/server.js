// Creating the server for the app
const express = require('express');
const app = express();
const database = require('./database')
const bodyParser = require('body-parser');
// Body Parser will format the data so that it will store in the mongodb
app.use(bodyParser.json());
// We will import the schema of the signup
const signupschema = require('./models/usersignup');
app.post('/', (req, res) => {
    res.send('Hello')
})

// Creating the POST request for collecting the user data in the usersignupschema
app.post('/usersignup', async (req, res) => {
    try {

        const data = req.body;
        const user = await signupschema(data).save();

        console.log('Data is saved in the mongodb');
        res.status(200).json(user);
    }

    catch (err) {

        console.log(err);
        res.status(500).json({ err: 'Internal Server error' })
    }

})

// Creating the GET request for fetching the user data in the usersignupschema
app.get('/usersignupdetail', async (req, res) => {
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
// Creating the lister where server will run
app.listen(5000, () => {

    console.log('Server is running on the local host 5000');
})
