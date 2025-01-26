const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentSchema = new Schema({
    slno: {
        type: Number,
        required: true,
        unique: true
    },
    classid: {
        type: Schema.Types.ObjectId,
        ref: 'Classes',
        required: true,
        validate: {
            validator: function (classId) {
                return !!this.model('Classes').findById(classId);
            },
            message: props => `${props.value} is not a valid classId`
        }
    },
    name: {
        type: String
    },
    section: {
        type: String
    },
    doi: { type: Date, default: Date.now },
});

const Student = mongoose.model('Student', studentSchema);
Student.createIndexes();
module.exports = Student;