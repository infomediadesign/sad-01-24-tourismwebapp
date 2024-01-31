const express = require('express');
const router = express.Router();
const SavedItem = require('../models/saveditemModel');
const cors = require('cors');

router.use(express.json()); //Middleware to parse the JSON data
router.use(cors());

router.post('/saveditems/addSavedItem', async (req, res) => {
    try {
        const saveditem = await SavedItem.create(req.body)
        res.status(201).json(saveditem);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

router.get('/saveditems', async (req, res) => {
    try {
        const saveditem = await SavedItem.find({})
        res.status(200).json(saveditem);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

router.get('/saveditems/get/:id', async (req, res) => {
    try {
        const saveditem = await SavedItem.findById(req.params.id)
        res.status(200).json(saveditem);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

router.put('/saveditems/update/:id', async (req, res) => {
    const id = req.params.id;
    console.log(`request: ${req.body}`);
    // console.log(`id: ${id}`);
    try {
        const result = await SavedItem.findByIdAndUpdate({ _id: id }, {
            place: req.body.place,
            email: req.body.email,
            country: req.body.country,
            date: req.body.date,
        });
        console.log(`result: ${result}`);
        res.status(result ? 200 : 404).json({
            message: result ? 'SavedItem updated successfully' : 'SavedItem not found'
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});
router.delete('/saveditems/delete/:id', async (req, res) => {
    try {
        const result = await SavedItem.findByIdAndDelete(req.params.id);
        res.status(result ? 200 : 404).json({
            message: result ? 'SavedItem deleted successfully' : 'SavedItem not found'
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});
module.exports = router;