const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();
const Classes = require("../models/Classes");
const Attendance = require("../models/Attendance");
const { validationResult } = require("express-validator");

router.get("/", async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const newClass = await Classes.create({
                name: req.body.name,
                description: req.body.description,
                course: req.body.course,
                section: req.body.section,
                strength: req.body.strength,
            });
            console.log("Success in adding Class");
            res.send(newClass);
        } catch (error) {
            res.status(500).send({
                message: "An unexpected error occurred while creating the Class.",
            });
        }
    } else {
        res.send({ errors: errors.array() });
    }
});

router.get("/attendance", async (req, res) => {
    try {
        const classId = req.query.classid;
        const classid = new mongoose.Types.ObjectId(classId);
        const classes = await Attendance.find({ classId: classid });

        const filteredClasses = classes.map(record => ({
            subject: record.subject,
        }));

        res.status(200).json(filteredClasses);
    } catch (error) {
        res.status(500).send({
            message: "An error occurred while getting attendance of classes", error: error.message,
        });
    }
});

module.exports = router;
