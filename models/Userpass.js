const mongoose = require('mongoose');
const { Schema } = mongoose;

const userpassSchema = new Schema({
    userid: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: function(userId) {
                return!!this.model('User').findById(userId);
            },
            message: props => `${props.value} is not a valid user ID`
        }
    },
    password: {
        type: String,
        required: true
    },
    doj: { type: Date, default: Date.now },
});

const Userpass = mongoose.model('Userpass', userpassSchema);
Userpass.createIndexes();
module.exports = Userpass;