const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    trim: true
  },
  Password: {
    type: String,
    required: true
  },
  }, );

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;
