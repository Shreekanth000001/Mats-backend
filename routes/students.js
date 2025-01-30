const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Students = require('../models/Students');
const Attendance = require('../models/Attendance');
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

router.get('/class', async (req, res) => {
    try {
        const classIds= req.query.classid;
        const classId= new mongoose.Types.ObjectId(classIds);
        const students = await Students.find({classid : classId});
        res.status(200).json(students);
          } catch (error) {
        res.status(500).send({ message: 'An error occurred while getting students',error:error.message });
      }
    });

router.get('/attendance', async (req, res) => {
    try {
        const studentIds= req.query.studentid;
        const studentId= new mongoose.Types.ObjectId(studentIds);
        const student = await Students.findOne({ _id: studentId });
        const attendance = await Attendance.find({
            students:  {$elemMatch:{ studentId: studentId}}});

            const filteredAttendance = attendance.map(record => ({
                _id: record._id,
                name:student.name,
                classId: record.classId,
                date: record.date,
                subject: record.subject,
                student: record.students.find(student => student.studentId.equals(studentId)) // Filter out only this student
            }));

        res.status(200).json(filteredAttendance);
          } catch (error) {
        res.status(500).send({ message: 'An error occurred while getting attendance of student',error:error.message });
      }
    });

module.exports = router;