const express = require('express');
const router = express.Router();
const Country = require('../models/countryModel');
const cors = require('cors');
const axios = require('axios');

router.use(express.json()); //Middleware to parse the JSON data
router.use(cors());

/**
 * @openapi
 * /countries/addCountry:
 *   post:
 *     tags:
 *       - Country
 *     summary: Add a new country
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
 *               image1:
 *                 type: string
 *               image2:
 *                 type: string
 *               image3:
 *                 type: string
 *               description:
 *                 type: string
 *             required:
 *               - name
 *               - imageMain
 *               - image1
 *               - image2
 *               - image3
 *               - description
 *     responses:
 *       201:
 *         description: Country added successfully
 *       500:
 *         description: Internal Server Error
 */

router.post('/countries/addCountry', async (req, res) => {
    try {
        const country = await Country.create(req.body)
        res.status(201).json({ message: 'Country added successfully', country });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

/**
 * @openapi
 * /countries:
 *   get:
 *     tags:
 *       - Country
 *     summary: Get all countries
 *     responses:
 *       200:
 *         description: Fetched list of countries
 *       500:
 *         description: Internal Server Error
 */

router.get('/countries', async (req, res) => {
    try {
        const country = await Country.find({})
        res.status(200).json(country);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

/**
 * @openapi
 * /countries/getCountry/{id}:
 *   get:
 *     tags:
 *       - Country
 *     summary: Get a country by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The country id
 *     responses:
 *       200:
 *         description: Fetched country by id
 *       500:
 *         description: Internal Server Error
 */

router.get('/countries/getCountry/:id', async (req, res) => { 
    try {
        const country = await Country.findById(req.params.id)
        const id = req.params.id;
        res.status(200).json(country);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

/**
 * @openapi
 * /countries/update/{id}:
 *   put:
 *     tags:
 *       - Country
 *     summary: Update a country by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The country id
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
 *               image1:
 *                 type: string
 *               image2:
 *                 type: string
 *               image3:
 *                 type: string
 *               description:
 *                 type: string
 *             required:
 *               - name
 *               - imageMain
 *               - image1
 *               - image2
 *               - image3
 *               - description
 *     responses:
 *       200:
 *         description: Country updated successfully
 *       404:
 *         description: Country not found
 *       500:
 *         description: Internal Server Error
 */

router.put('/countries/update/:id', async (req, res) => {
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

/**
 * @openapi
 * /countries/delete/{id}:
 *   delete:
 *     tags:
 *       - Country
 *     summary: Delete a country by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The country id
 *     responses:
 *       200:
 *         description: Country deleted successfully
 *       404:
 *         description: Country not found
 *       500:
 *         description: Internal Server Error
 */

router.delete('/countries/delete/:id', async (req, res) => {
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

/**
 * @openapi
 * /countries/places:
 *   get:
 *     tags:
 *       - Country
 *     summary: Get all countries with places
 *     responses:
 *       200:
 *         description: Fetched list of countries with places
 *       500:
 *         description: Internal Server Error
 */

router.get('/countries/places', async (req, res) => {
    try {
        const countries = await Country.find({})
        const countriesWithPlaces = await Promise.all(countries.map(async country => {
            const placesRes = await axios.get(`http://localhost:9000/places/${country.name}`)
            const places = placesRes.data;
            return {
                ...country.toObject(),
                places
            };
        })
    );
    res.status(200).json(countriesWithPlaces);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
});

module.exports = router;