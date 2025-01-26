const express = require('express');
const router = express.Router();
const Students = require('../models/Students');
const { body, validationResult } = require('express-validator');

router.get('/',
    async (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            try {
                const newStudent = await Students.create({
                    slno: req.body.slno,
                    classid: req.body.classid,
                    name: req.body.name,
                    section: req.body.section
                });
                console.log("Success in adding Student");
                res.send(newStudent);
            } catch (error) {
                res.status(500).send({ message: "An unexpected error occurred while creating the Student." });
            }
        } else {
            res.send({ errors: errors.array() });
        }
    })

module.exports = router;