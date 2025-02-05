const express = require('express');
const router = express.Router();
const UserPass = require('../models/UserPass');
const { validationResult } = require('express-validator');

router.post('/',
    async (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            try {
                const newUserPass = await UserPass.create({
                    userid: req.body.userid,
                    password: req.body.password,
                });
                res.send(newUserPass);
            } catch (error) {
                console.log(error);
                res.status(500).send({ message: "An unexpected error occurred while storing the password." });
            }
        } else {
            res.send({ errors: errors.array() });
        }
    })

module.exports = router;