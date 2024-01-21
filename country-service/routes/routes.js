const express = require('express');
const router = express.Router();
<<<<<<< HEAD
<<<<<<< HEAD
const Country = require('../models/countryModel');

router.use(express.json()); //Middleware to parse the JSON data

router.post('/addCountry', async(req, res) => {
    try{
        const country = await Country.create(req.body)
        res.status(200).json(country);
    } catch(error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
=======

router.get('/getCountry', (req, res) => {
    res.send("hello i am get");
>>>>>>> 5f4e276 (created routes for country service)
=======
const app = express();
const Country = require('../models/countryModel');
app.use(express.json())

router.post('/addCountry', async(req, res) => {
    try{
        const country = await Country.create(req.body)
        res.status(200).json(country);
    } catch(error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
>>>>>>> 3d0b519 (created schema for my countryModel in DB)
})
router.get('/', (req, res) => {
    res.send("hello i am post");
})

module.exports = router ;