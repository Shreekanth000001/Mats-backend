const express = require('express');
const router = express.Router();
const Userpass = require('./models/Userpass');
const { validationResult } = require('express-validator');

router.post('/',
    async (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            try {
                const newUserpass = await Userpass.create({
                    userid: req.body.userid,
                    password: req.body.password,
                });
                res.send(newUserpass);
            } catch (error) {
                res.status(500).send({ message: "An unexpected error occurred while storing the password." });
            }
        } else {
            res.send({ errors: errors.array() });
        }
    })

module.exports = router;