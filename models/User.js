const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
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
    classmod: {
        type: String,
        required:true
    },
    approved: {
        type: String,
        enum: ["no","yes"],
        default: "no"
    },
    doj: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);
User.createIndexes();
module.exports = User;