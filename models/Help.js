const mongoose = require('mongoose');
const { Schema } = mongoose;

const helpSchema = new Schema({
  userid: {
    type: String,
    required: true,
    validate: {
        validator: function(userid) {
            return!!this.model('User').findById(userid);
        },
        message: props => `${props.value} is not a valid user id`
    }
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  doj: { type: Date, default: Date.now },
});

const Help = mongoose.model('Help', helpSchema);
Help.createIndexes();
module.exports = Help;