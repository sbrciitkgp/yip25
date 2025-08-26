const mongoose = require("mongoose");

const pocSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true
  },
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: "team" }]
}, );

const POC = mongoose.model("poc", pocSchema);

module.exports = POC;
