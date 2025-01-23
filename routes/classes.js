const express = require('express');
const router = express.Router();
const Classes = require('../models/Classes');
const { body, validationResult } = require('express-validator');

router.get('/',
    async (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            try {
                const newClass = await Classes.create({
                    name: req.body.name,
                    description: req.body.description,
                    course: req.body.course,
                    section: req.body.section,
                    strength: req.body.strength
                });
                console.log("Success in adding Class");
                res.send(newClass);
            } catch (error) {
                res.status(500).send({ message: "An unexpected error occurred while creating the Class." });
            }
        } else {
            res.send({ errors: errors.array() });
        }
    })

module.exports = router;