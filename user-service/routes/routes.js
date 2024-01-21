const express = require('express')
const router = express.Router()
const UserModel = require('../models/userModel')
const cors = require('cors')
// const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')

router.use(express.json()); //Middleware to parse the JSON data
router.use(cors());
router.use(cookieParser())

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    bcrypt.hash(password, 10) //hash pwd using bcrypt
    .then(hash => {
        UserModel.create({ name, email, password: hash })
        .then(user => res.status(200).json(user))
        .catch(err => res.json(err))
    }).catch(err => res.status(500).json({ message: err.message }))
})

module.exports = router;