const mongoose = require('mongoose');
const { Schema } = mongoose;

const classesSchema = new Schema({
    userid: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: function (userId) {
                return !!this.model('User').findById(userId);
            },
            message: props => `${props.value} is not a valid userId`
        }
    },
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
    section: {
        type: String
    },
    subjects: {
        type: [String],
        required: true
    },
    strength: {
        type: Number
    },
    doi: { type: Date, default: Date.now },
});

const Classes = mongoose.model('Classes', classesSchema);
Classes.createIndexes();
module.exports = Classes;