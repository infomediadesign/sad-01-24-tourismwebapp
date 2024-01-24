const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes/routes');

app.use(routes);
const port = 9000;

mongoose.connect('mongodb+srv://admin:aLDQhMWr2AQ3bsBe@cluster0.yz76vjj.mongodb.net/', { dbName: 'places', })
.then(() => {
    app.listen(port, () => {
        console.log(`App running on ${port}`);
    })
    console.log('Connected to MongoDB')
}).catch((error) => {
    console.log(error);
})