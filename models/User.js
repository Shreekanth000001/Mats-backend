const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
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
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneno: {
        type: String
    },
    doj: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);
User.createIndexes();
module.exports = User;