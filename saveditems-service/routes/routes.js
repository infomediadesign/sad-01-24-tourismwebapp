const express = require('express');
const router = express.Router();
const SavedItem = require('../models/saveditemModel');
const cors = require('cors');

router.use(express.json()); //Middleware to parse the JSON data
router.use(cors());

router.post('/addSavedItem', async (req, res) => {
    try {
        const saveditem = await SavedItem.create(req.body)
        res.status(201).json(saveditem);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

router.get('/getSavedItem', async (req, res) => {
    try {
        const saveditem = await SavedItem.find({})
        res.status(200).json(saveditem);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

router.get('/getSavedItem/:id', async (req, res) => {
    try {
        const saveditem = await SavedItem.findById(req.params.id)
        res.status(200).json(saveditem);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

router.put('/updateSavedItem/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await SavedItem.findByIdAndUpdate({ _id: id }, {
            place: req.body.place,
            custid: req.body.custid,
            country: req.body.country,
            date: req.body.date,
            description: req.body.description,
        });
        res.status(result ? 200 : 404).json({
            message: result ? 'SavedItem updated successfully' : 'SavedItem not found'
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;