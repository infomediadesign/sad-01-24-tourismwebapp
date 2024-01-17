const express = require('express'); //creating a express server
const app = express(); //creating an instance of express app

const port = "5000"; //port on which app will handle all requests

app.get('/', (req,res) => {
    res.send('hello world');
})

app.listen(port, () => {
    console.log(`App running on ${port}`);
})
