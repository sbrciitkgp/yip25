const mongoose = require('mongoose');

mongoose.connect(`mongodb://127.0.0.1:27017/yip`);

const resultSchema = new mongoose.Schema({
  TeamName: {
    type: String,
    required: true,
    trim: true
  },
  SchoolName: {
    type: String,
    required: true,
    trim: true
  },
  Round1: {
    type: Boolean,
    default: false
  },
  Round2: {
    type: Boolean,
    default: false
  },
  Round3: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("result", resultSchema);
