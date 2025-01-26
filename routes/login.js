const express = require('express')
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWS_SECRET = 'password';

router.post('/',
    async (req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (user) {
            const secPass = await bcrypt.compare(password, user.password);
            if (!secPass) {
                return res.status(401).send({ message: 'Invalid email or password' });
            }
        } else {
            return res.status(401).send({ message: 'Invalid email or password' });
        }

        const data = {
            user: {
                id: user.id
            }
        };
        const authToken = jwt.sign(data, JWS_SECRET);

        return res.json({ authToken });

    })

module.exports = router;