const express = require('express')
const router = express.Router()
const cors = require('cors')
const Place = require('../models/placeModel')
// const multer = require('multer')

router.use(express.json()); //Middleware to parse the JSON data
router.use(cors());

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "./public/images");
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now();
//         cb(null, uniqueSuffix + file.originalname);
//     },
// });

// const upload = multer({ storage: storage });

router.post('/addPlaces', async (req, res) => {
    // console.log(req.file);
    try {
        // const imageName = req.file.filename;
        const place = await Place.create({
            name: req.body.name,
            imageMain: req.body.imageMain,
            image: req.body.image,
            country: req.body.country,
            description: req.body.description,
        })
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

router.get('/getPlaces/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const place = await Place.findById(id);
        res.status(200).json(place);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

router.put('/updatePlace/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Place.findByIdAndUpdate({ _id: id }, {
            name: req.body.name,
            imageMain: req.body.imageMain,
            image: req.body.image,
            country: req.body.country,
            description: req.body.description,
        });
        res.status(result ? 200 : 404).json({
            message: result ? 'Place updated successfully' : 'Place not found'
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});

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