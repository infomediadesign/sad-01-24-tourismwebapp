const express = require('express');
const router = express.Router();

router.get('/getCountry', (req, res) => {
    res.send("hello i am get");
})
router.get('/', (req, res) => {
    res.send("hello i am post");
})

module.exports = router ;