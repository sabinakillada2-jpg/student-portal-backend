const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: String,
  email: String,
  department: String,
  semester: Number
});

module.exports = mongoose.model("Student", StudentSchema);