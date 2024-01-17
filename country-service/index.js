const express = require('express'); //creating a express server
const app = express(); //creating an instance of express app
const routes = require('./routes/routes');
const mongoose = require('mongoose');

app.use(routes);

const port = "5000"; //port on which app will handle all requests

mongoose.connect('mongodb+srv://admin:aLDQhMWr2AQ3bsBe@cluster0.yz76vjj.mongodb.net/', {dbName: 'countrydetails',}).
    then(() => {
        app.listen(port, () => {
            console.log(`App running on ${port}`);
        })
        console.log('Connected to MongoDB')
    }).catch((error) => {
        console.log(error);
    })


