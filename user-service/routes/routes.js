const express = require('express')
const router = express.Router()
const UserModel = require('../models/userModel')
const cors = require('cors')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')

router.use(express.json());
router.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
router.use(cookieParser())

const createPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@/])[A-Za-z\d@/]{8,}$/;
    return passwordRegex.test(password);
};

router.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    UserModel.findOne({ email })
        .then(existingUser => {
            if (existingUser) {
                return res.status(409).json({ message: 'User already exists with this email' });
            }
            if (!createPassword(password)) {
                return res.status(400).json({ message: 'Password must be 8 characters long with at least one uppercase letter, one lowercase letter, one number, and one of the special characters @ or /' });
            }

            bcrypt.hash(password, 10)
                .then(hash => {
                    UserModel.create({ name, email, password: hash })
                        .then(() => res.status(201).json({ message: 'User created successfully. Please login.' }))
                        .catch(err => res.status(500).json({ message: err.message }));
                }).catch(err => res.status(500).json({ message: err.message }));
        }).catch(err => res.status(500).json({ message: err.message }));
});

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    console.log(token)
    if (!token) {
        return res.status(404).json("Token is missing")
    } else {
        jwt.verify(token, "auth_token_key_header", (err, decoded) => {
            if (err) {
                return res.status(400).json("Invalid token")
            } else {
                if (decoded.role === 'admin') {
                    next()
                } else {
                    return res.status(401).json("Not Admin")
                }
            }
        })
    }
}

router.get('/country', verifyUser, (req, res) => {
    res.status(200).json("Success");
})

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, response) => {
                    if (response) {
                        const token = jwt.sign({ email: user.email, role: user.role }, 'auth_token_key_header', { expiresIn: '1d' })
                        res.cookie('token', token, { httpOnly: true })
                        return res.status(200).json({ status: "successful", token, role: user.role })
                    } else {
                        return res.status(401).json({ message: "Login failed" })
                    }
                })
            } else {
                return res.status(401).json({ message: "Auth failed" })
            }
        }).catch(err => res.status(500).json({ message: err.message }));
})

module.exports = router;