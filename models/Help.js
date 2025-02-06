const mongoose = require('mongoose');
const { Schema } = mongoose;

const helpSchema = new Schema({
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