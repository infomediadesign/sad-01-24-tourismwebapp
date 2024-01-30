const express = require('express'); //creating a express server
const app = express(); //creating an instance of express app
const routes = require('./routes/routes');
const mongoose = require('mongoose');

import Redis from "ioredis"
const Redis = require("ioredis");
const client = new Redis("rediss://default:acda3123066847b389d05569259aa90e@eu2-gorgeous-buzzard-32656.upstash.io:32656");
await client.set('foo', 'bar');


app.use(routes);

const port = "8000"; //port on which app will handle all requests

mongoose.connect('mongodb+srv://admin:aLDQhMWr2AQ3bsBe@cluster0.yz76vjj.mongodb.net/', { dbName: 'saveditems', }).
    then(() => {
        app.listen(port, () => {
            console.log(`App running on ${port}`);
        })
        console.log('Connected to MongoDB')
    }).catch((error) => {
        console.log(error);
    })