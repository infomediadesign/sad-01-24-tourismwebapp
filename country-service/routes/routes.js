const express = require('express');
const router = express.Router();
const Country = require('../models/countryModel');
const cors = require('cors');

router.use(express.json()); //Middleware to parse the JSON data
router.use(cors());

router.post('/addCountry', async (req, res) => {
    try {
        const country = await Country.create(req.body)
        res.status(201).json(country);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})
router.get('/getCountry', async (req, res) => {
    try {
        const country = await Country.find({})
        res.status(200).json(country);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

router.get('/getCountry/:id', async (req, res) => { 
    try {
        const country = await Country.findById(req.params.id)
        res.status(200).json(country);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

router.put('/updateCountry/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Country.findByIdAndUpdate({ _id: id }, {
            name: req.body.name,
            imageMain: req.body.imageMain,
            image1: req.body.image1,
            image2: req.body.image2,
            image3: req.body.image3,
            description: req.body.description,
        });
        res.status(result ? 200 : 404).json({
            message: result ? 'Country updated successfully' : 'Country not found'
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});

router.delete('/deleteCountry/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Country.findByIdAndDelete({ _id: id });
        res.status(result ? 200 : 404).json({
            message: result ? 'Country deleted successfully' : 'Country not found'
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;