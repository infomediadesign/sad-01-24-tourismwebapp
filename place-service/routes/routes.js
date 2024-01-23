const express = require('express')
const router = express.Router()
const cors = require('cors')
const Place = require('../models/placeModel')

router.use(express.json()); //Middleware to parse the JSON data
router.use(cors());

router.post('/addPlaces', async (req, res) => {
    try {
        const place = await Place.create(req.body)
        res.status(201).json(place);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})
router.get('/getPlaces', async (req, res) => {
    try {
        const place = await Place.find({})
        res.status(200).json(place);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

router.delete('/deletePlace/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Place.findByIdAndDelete({ _id: id });
        res.status(result ? 200 : 404).json({
            message: result ? 'Place deleted successfully' : 'Place not found'
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;