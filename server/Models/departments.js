const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  staffNumber: {
    type: Number,
    required: true,
  },
});
const Department = mongoose.model("Department", schema);
module.exports = Department;
