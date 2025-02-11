const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const mongoose = require('mongoose');
const Classes = require('../models/Classes');
const { validationResult } = require('express-validator');

router.post('/',
    async (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            try {
                const newAttendance = await Attendance.create({
                    classId: req.body.classId,
                    date: req.body.date,
                    subjects: req.body.subjects,
                    students: req.body.students
                });
                console.log("Success in adding Attendance");
                res.send(newAttendance);
            } catch (error) {
                res.status(500).send({ message: "An unexpected error occurred while creating the Attendance" });
            }
        } else {
            res.send({ errors: errors.array() });
        }
    })
router.get('/getall', async (req, res) => {
    try {
        const classes = await Classes.find({ approved: "yes" });
        const classIds = classes.map(cls => cls._id);
        const attendance = await Attendance.find({ classId: { $in: classIds } });
        res.status(200).json(attendance);
    } catch (error) {
        res.send(error);
    }
});

router.post('/delete', async (req, res) => {
    try {
        const { attendanceId } = req.body;

        if (!mongoose.Types.ObjectId.isValid(attendanceId)) {
            return res.status(400).send({ message: "Invalid attendance ID format" });
        }
        const result = await Attendance.findByIdAndDelete(attendanceId);

        if (!result) {
            return res.status(404).send({ message: "Attendance record not found" });
        }
        res.status(200).send({
            message: "Attendance deleted successfully"
        });
    } catch (error) {
        console.error("Delete error:", error);
        res.status(500).send({ message: "Error deleting attendance", error: error.message });
    }
});
router.post('/update', async (req, res) => {
    try {
        const { _id, students, date, subject } = req.body;
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).send({ message: "Invalid attendance ID format" });
        }
        const updatedRecord = await Attendance.findByIdAndUpdate(
            _id,
            {
                $set: {
                    students,
                    date,
                    subject
                }
            },
            { new: true, runValidators: true }
        );
        if (!updatedRecord) {
            return res.status(404).send({ message: "Attendance record not found" });
        }
        res.status(200).send({ message: "Attendance updated successfully" });
    } catch (error) {
        console.error("Update error:", error);
        res.status(500).send({ message: "Error updating attendance", error: error.message });
    }
});

module.exports = router;