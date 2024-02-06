const express = require('express');
const router = express.Router();
const UserModel = require('../models/userModel');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer');

const Redis = require("ioredis");

const client = new Redis("rediss://default:26bc2971a4b24435993d3a71dd57c99d@eu2-topical-snake-30433.upstash.io:30433");

router.use(express.json());
router.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
router.use(cookieParser());

const createPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@/])[A-Za-z\d@/]{8,}$/;
    return passwordRegex.test(password);
};

// Middleware to cache user data
const cacheUserData = async (key, data) => {
    await client.set(key, JSON.stringify(data), 'EX', 3600); // Cache for 1 hour
};

// Middleware to retrieve user data from cache
const getUserDataFromCache = async (key) => {
    const data = await client.get(key);
    return JSON.parse(data);
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
router.post('/users/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ message: 'User already exists with this email' });
        }

        if (!createPassword(password)) {
            return res.status(400).json({ message: 'Password must be 8 characters long with at least one uppercase letter, one lowercase letter, one number, and one of the special characters @ or /' });
        }

        const hash = await bcrypt.hash(password, 10);
        await UserModel.create({ name, email, password: hash });

        // Cache the newly registered user data
        await cacheUserData(email, { name, email });

        return res.status(201).json({ message: 'User created successfully. Please login.' });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

const verifyUser = async (req, res, next) => {
    const usertoken = req.cookies.usertoken;

    if (usertoken) {
        jwt.verify(usertoken, "auth_token_key_header", async (err, decoded) => {
            if (err) {
                return res.status(400).json("Invalid token");
            } else {
                // Check if user data exists in cache
                const userData = await getUserDataFromCache(decoded.email);
                if (userData) {
                    req.user = userData;
                } else {
                    req.email = decoded.email;
                }
                next();
            }
        });
    } else {
        return res.status(404).json("Token is missing");
    }
};

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
router.get('/users/auth', verifyUser, async (req, res) => {
    if (req.user) {
        return res.status(200).json({ message: "Success", email: req.user.email });
    } else {
        // Retrieve user data from database if not found in cache
        try {
            const user = await UserModel.findOne({ email: req.email });
            if (user) {
                // Cache the user data
                await cacheUserData(user.email, { name: user.name, email: user.email });
                return res.status(200).json({ message: "Success", email: user.email });
            } else {
                return res.status(401).json({ message: "Auth failed" });
            }
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
});

// Other routes and middleware...

module.exports = router;
