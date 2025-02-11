const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();
const Classes = require("../models/Classes");
const Attendance = require("../models/Attendance");
const { body, validationResult } = require("express-validator");

router.post("/", async (req, res) => {
        const errors = validationResult(req);

        if (errors.isEmpty()) {
            try {
                const newClass = await Classes.create({
                    userid: req.body.userid,
                    name: req.body.name,
                    description: req.body.description,
                    course: req.body.course,
                    section: req.body.section,
                    strength: req.body.strength,
                    subjects: req.body.subjects || [],
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
        const classname = await Classes.findOne({ _id: classid });
        const attendances = await Attendance.find({ classId: classid });

        const subjects = attendances.flatMap(record => record.subjects);

        res.status(200).json({
            classname: classname.name,
            subjects: subjects
        });
    } catch (error) {
        res.status(500).send({
            message: "An error occurred while getting attendance of classes", error: error.message,
        });
    }
});

router.post('/delete', async (req, res) => {
    try {
        const { classId } = req.body;

        if (!mongoose.Types.ObjectId.isValid(classId)) {
            return res.status(400).send({ message: "Invalid class ID format" });
        }
        const result = await Classes.findByIdAndDelete(classId);

        if (!result) {
            return res.status(404).send({ message: "class record not found" });
        }
        res.status(200).send({
            message: "class deleted successfully"
        });
    } catch (error) {
        console.error("Delete error:", error);
        res.status(500).send({ message: "Error deleting class", error: error.message });
    }
});

module.exports = router;
