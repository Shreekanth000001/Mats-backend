const mongoose = require('mongoose');
const { Schema } = mongoose;

const classesSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    course: {
        type: String
    },
    section:{
        type:String
    },
    strength: {
        type: Number
    },
    doi: { type: Date, default: Date.now },
});

const Classes = mongoose.model('Classes', classesSchema);
Classes.createIndexes();
module.exports = Classes;