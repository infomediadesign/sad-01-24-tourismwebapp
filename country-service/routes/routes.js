const express = require('express');
const router = express.Router();
const Country = require('../models/countryModel');
const cors = require('cors');

router.use(express.json()); //Middleware to parse the JSON data
router.use(cors());

router.post('/addCountry', async(req, res) => {
    try{
        const country = await Country.create(req.body)
        res.status(200).json(country);
    } catch(error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})
router.get('/getCountry', async (req, res) => {
    try {
        const country = await Country.find({})
        res.status(200).json(country);
    }catch(error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

module.exports = router ;