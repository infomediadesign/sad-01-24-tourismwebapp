const express = require('express'); //creating a express server
const app = express(); //creating an instance of express app
const mongoose = require('mongoose');
const routes = require('./routes/routes');

app.use(routes);
const port = "4000"; //port on which app will handle all requests

mongoose.connect('mongodb+srv://admin:aLDQhMWr2AQ3bsBe@cluster0.yz76vjj.mongodb.net/', { dbName: 'users', })
.then(() => {
    app.listen(port, () => {
        console.log(`App running on ${port}`);
    })
    console.log('Connected to MongoDB')
}).catch((error) => {
    console.log(error);
})