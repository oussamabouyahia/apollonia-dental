const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  departementId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
  },
});

const Employee = mongoose.model("Employee", schema);
module.exports = Employee;
