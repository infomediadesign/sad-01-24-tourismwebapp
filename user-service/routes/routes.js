const express = require('express')
const router = express.Router()
const UserModel = require('../models/userModel')
const cors = require('cors')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')

router.use(express.json()); //Middleware to parse the JSON data
router.use(cors());
router.use(cookieParser())

router.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    bcrypt.hash(password, 10) //hash pwd using bcrypt
        .then(hash => {
            UserModel.create({ name, email, password: hash })
                .then(user => res.status(201).json(user))
                .catch(err => res.json(err)) //error handling for issues with creating user
        }).catch(err => res.status(500).json({ message: err.message })) //error handling for issues with hashing
})

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email })
    .then(user => {
        if (user) {
            bcrypt.compare(password, user.password, (err, response) => {
                if (response) {
                    const token = jwt.sign({ email: user.email, _id: user._id }, 'auth_token_key_header', { expiresIn: '1d' })
                    res.cookie('token', token, { httpOnly: true })
                    return res.status(200).json({ message: "Login successful", token })
                } else {
                    res.status(401).json({ message: "Login failed" })
                }
            })
        } else {
            return res.status(401).json({ message: "Auth failed" })
        }
    })
})

module.exports = router;