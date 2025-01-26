const express = require('express');
const router = express.Router();
const Help = require('../models/Help');
const {validationResult } = require('express-validator');

router.post('/',
    async (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            try {
                const newHelp = await Help.create({
                    userid: req.body.userid,
                    title: req.body.title,
                    description: req.body.description,
                });
                res.status(200).send({ message: "Successfully sent the report!" });
            } catch (error) {
                res.status(500).send({ error: "An unexpected error occurred while creating the help report." });
            }
        } else {
            res.send({ errors: errors.array() });
        }
    })

module.exports = router;