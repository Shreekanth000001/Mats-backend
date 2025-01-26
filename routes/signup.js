const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWS_SECRET = 'password';

router.post('/',
    body('name').notEmpty().isLength({ min: 5 }).withMessage('Name must be longer than 3 letters '),
    body('email').isEmail().withMessage('Enter valid email '),
    body('password').notEmpty().isLength({ min: 5 }).withMessage('Password must be atleast 6 letters long '),
    async (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);
            try {
                const newUser = await User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: secPass
                });
                const data = {
                    user: {
                        id: newUser.id
                    }
                };
                const authToken = jwt.sign(data, JWS_SECRET);
                res.json({ authToken });
            } catch (error) {
                if (error.code === 11000) {
                    // Duplicate key error(11000), send a specific error message
                    res.status(400).send({ error: "A user with this email already exists." });
                } 
                else {
                    // Other errors, log and send a general error message
                    res.status(500).send({ message: "An unexpected error occurred while creating the user.",error: error.message  });
                }
            }
        } else {
            res.send({ errors: errors.array() });
        }
    }
);

module.exports = router;