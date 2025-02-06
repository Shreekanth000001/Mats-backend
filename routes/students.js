const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Students = require('../models/Students');
const Attendance = require('../models/Attendance');
const Classes = require('../models/Classes');
const {  validationResult } = require('express-validator');

router.post('/',
    async (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            try {
                const newStudent = await Students.create({
                    slno: req.body.slno,
                    classid: req.body.classid,
                    name: req.body.name
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
        res.status(500).send({ message: 'An error occurred while getting class students',error:error.message });
      }
    });
router.get('/getall', async (req, res) => {
    try {
        const students = await Students.find({});
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
        const classname = await Classes.findOne({ _id: student.classid });
        const attendance = await Attendance.find({
            students:  {$elemMatch:{ studentId: studentId}}});

            const filteredAttendance = attendance.map(record => ({
                _id: record._id,
                name:student.name,
                classname:classname.name,
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
    router.post('/delete', async (req, res) => {
        try {
            const { studentId } = req.body;
    
            if (!mongoose.Types.ObjectId.isValid(studentId)) {
                return res.status(400).send({ message: "Invalid student ID format" });
            }
            const result = await Students.findByIdAndDelete(studentId);
    
            if (!result) {
                return res.status(404).send({ message: "student record not found" });
            }
            res.status(200).send({
                message: "student deleted successfully"
            });
        } catch (error) {
            console.error("Delete error:", error);
            res.status(500).send({ message: "Error deleting student", error: error.message });
        }
    });

module.exports = router;