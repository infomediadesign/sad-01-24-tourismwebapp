const express = require('express')
const router = express.Router()
const UserModel = require('../models/userModel')
const cors = require('cors')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const nodemailer = require('nodemailer')

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
/**
 * @openapi
 * '/users/register':
 *   post:
 *     tags:
 *       - User
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User created successfully. Please login.
 *       400:
 *         description: Password must be 8 characters long with at least one uppercase letter, one lowercase letter, one number, and one of the special characters @ or /
 *       409:
 *         description: User already exists with this email
 *       500:
 *         description: Internal Server Error
 */


router.post('/users/register', (req, res) => {
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
    if (!token) {
        return res.status(404).json("Token is missing")
    } else {
        jwt.verify(token, "auth_token_key_header", (err, decoded) => {
            if (err) {
                return res.status(400).json("Invalid token")
            } else {
                // req.email = decoded.email;
                if (decoded.role === 'admin') {
                    next()
                } else if (decoded.role === 'visitor') {
                    return res.status(400).json({email: decoded.email, message: "Success"})
                } else {
                    return res.status(401).json("Not a valid user")
                }

            }
        })
    }
}

/**
 * @openapi
 * '/users/auth':
 *   get:
 *     tags:
 *       - User
 *     summary: Authenticate a user
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Not Admin
 *       500:
 *         description: Internal Server Error
 */

router.get('/users/auth', verifyUser, (req, res) => {
    // const userEmail = req.email;
    res.status(200).json("Success");
    console.log(userEmail);
})

/**
 * @openapi
 * '/users/login':
 *   post:
 *     tags:
 *       - User
 *     summary: Login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Login failed
 *       500:
 *         description: Internal Server Error
 */

router.post('/users/admin/login', (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, response) => {
                    if (response) {
                        const token = jwt.sign({ email: user.email, role: user.role }, 'auth_token_key_header', { expiresIn: '1d' })
                        res.cookie('token', token, { httpOnly: true })
                        return res.status(200).json({ status: "successful", token, role: user.role, message: "Login successful" })
                    } else {
                        return res.status(401).json({ message: "Login failed" })
                    }
                })
            } else {
                return res.status(401).json({ message: "Auth failed" })
            }
        }).catch(err => res.status(500).json({ message: err.message }));
})

/**
 * @openapi
 * /users/login:
 *   post:
 *     tags:
 *       - User
 *     summary: Login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Login failed
 *       500:
 *         description: Internal Server Error
 */

router.post('/users/login', (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, response) => {
                    if (response) {
                        const token = jwt.sign({ email: user.email, role: user.role }, 'auth_token_key_header', { expiresIn: '1d' })
                        res.cookie('token', token, { httpOnly: true })
                        return res.status(200).json({ status: "successful", token, role: user.role, message: "Login successful" })
                    } else {
                        return res.status(401).json({ message: "Login failed. You can forget password or try logging in again." })
                    }
                })
            } else {
                return res.status(401).json({ message: "Auth failed. Please register" })
            }
        }).catch(err => res.status(500).json({ message: err.message }));
})

router.post('/users/forgotpassword', (req, res) => {
    const { email } = req.body;
    UserModel.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: "User not found" })
            }
            const token = jwt.sign({ id: user._id }, 'auth_token_key_header', { expiresIn: '1d' })
            var nodemailer = require('nodemailer');
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: '',
                    pass: ''
                }
            });

            var mailOptions = {
                from: 'swagatpruseth0911@gmail.com',
                to: 'arpitamishra1497@gmail.com',
                subject: 'Reset Password Link',
                text: `http://localhost:3000/resetpassword/${user._id}/${token}`
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    return res.send({ message: 'Email sent: ' + info.response });
                }
            })
        }).catch(err => res.status(500).json({ message: err.message }));
})

module.exports = router;