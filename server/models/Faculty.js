const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
  name: { type: String, required: true },
  facultyId: { type: String, required: true, unique: true },
  course: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("Faculty", facultySchema);
