const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const Classes = require('../models/Classes');
const { body, validationResult } = require('express-validator');

router.post('/',
    async (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            try {
                const newAttendance = await Attendance.create({
                    classId: req.body.classId,
                    date: req.body.date,
                    subject: req.body.subject,
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

module.exports = router;