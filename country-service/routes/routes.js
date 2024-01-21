const express = require('express');
const router = express.Router();
const Country = require('../models/countryModel');
const cors = require('cors');

router.use(express.json()); //Middleware to parse the JSON data
router.use(cors());

router.post('/addCountry', async (req, res) => {
    try {
        const country = await Country.create(req.body)
        res.status(200).json(country);
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

// DELETE operation
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