const express = require('express');
const router = express.Router();
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
})
router.get('/', (req, res) => {
    res.send("hello i am post");
})

module.exports = router ;