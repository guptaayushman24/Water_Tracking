// Creating the server for the app
const express = require('express');
const app = express();
const database = require('./database')
const bodyParser = require('body-parser');
// Body Parser will format the data so that it will store in the mongodb
app.use(bodyParser.json());
const usersignuproute = require('./routes/usersignupapi');
app.use('/signup',usersignuproute);
// Creating the lister where server will run
app.listen(5000, () => {

    console.log('Server is running on the local host 5000');
})
