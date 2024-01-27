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

/**
 * @openapi
 * /addPlaces:
 *   post:
 *     tags:
 *       - Places
 *     summary: Add a new place
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               imageMain:
 *                 type: string
 *               image:
 *                 type: string
 *               country:
 *                 type: string
 *               description:
 *                 type: string
 *             required:
 *               - name
 *               - imageMain
 *               - image
 *               - country
 *               - description
 *     responses:
 *       201:
 *         description: Place added successfully
 *       500:
 *         description: Internal Server Error
 */

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
        res.status(201).json({place, message: 'Place added successfully'});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

/**
 * @openapi
 * /getPlaces:
 *   get:
 *     tags:
 *       - Places
 *     summary: Get all places
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */

router.get('/getPlaces', async (req, res) => {
    try {
        const place = await Place.find({})
        res.status(200).json(place);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

/**
 * @openapi
 * /getPlaces/{id}:
 *   get:
 *     tags:
 *       - Places
 *     summary: Get place by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The place id
 *     responses:
 *       200:
 *         description: Fetched place by id
 *       500:
 *         description: Internal Server Error
 */

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

/**
 * @openapi
 * /updatePlace/{id}:
 *   put:
 *     tags:
 *       - Places
 *     summary: Update a place by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The place id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               imageMain:
 *                 type: string
 *               image:
 *                 type: string
 *               country:
 *                 type: string
 *               description:
 *                 type: string
 *             required:
 *               - name
 *               - imageMain
 *               - image
 *               - country
 *               - description
 *     responses:
 *       200:
 *         description: Place updated successfully
 *       500:
 *         description: Internal Server Error
 */

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

/**
 * @openapi
 * /deletePlace/{id}:
 *   delete:
 *     tags:
 *       - Places
 *     summary: Delete a place by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The place id
 *     responses:
 *       200:
 *         description: Place deleted successfully
 *       404:
 *         description: Place not found
 *       500:
 *         description: Internal Server Error
 */

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