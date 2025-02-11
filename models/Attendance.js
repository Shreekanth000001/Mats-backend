const mongoose = require("mongoose");
const { Schema } = mongoose;

const attendanceSchema = new Schema({
    classId: {
        type: Schema.Types.ObjectId,
        ref: "Classes",
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    subjects: {
        type: [String],
        required: true,
    },
    students: [
        {
            studentId: {
                type: Schema.Types.ObjectId,
                ref: "Students",
            },
            status: {
                type: String,
                enum: ["present", "absent"],
                required: true,
            },
        },
    ],
});

const Attendance = mongoose.model("Attendance", attendanceSchema);
Attendance.createIndexes();
module.exports = Attendance;
