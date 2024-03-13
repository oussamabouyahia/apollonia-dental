const Department = require("../Models/departments");
const Employee = require("../Models/employees");
const newDepartment = async (req, res) => {
  const { name, staffCapacity } = req.body;
  try {
    const newDep = new Department({ name, staffCapacity });
    newDep
      .save()
      .then(() => res.status(200).json({ newDep, message: "new dep added" }))
      .catch((err) => console.log(err.message));
  } catch (err) {
    res.status(500).send(err.message || "error occured");
    console.log(err.message);
  }
};
const listOfDepartment = async (req, res) => {
  try {
    const list = await Department.find();
    list.length
      ? res.status(200).json({ message: "here are the list", list })
      : res.status(404).send("list is empty");
  } catch (error) {
    res
      .status(error.status || 500)
      .send(error.message || "internal server problem");
  }
};
const updateDepartment = async (req, res) => {
  const { id } = req.params;
  const { name, staffCapacity } = req.body;
  try {
    const targetDepartment = await Department.findByIdAndUpdate(
      id,
      { name, staffCapacity },
      { new: true }
    );
    targetDepartment
      ? res.status(200).json({
          message: "department updated successfully",
          targetDepartment,
        })
      : res.sendStaus(400);
  } catch (error) {
    res
      .status(error.status || 500)
      .send(error.message || "internal server problem");
  }
};
const deleteDepartment = async (req, res) => {
  const { id } = req.params;
  try {
    const targetDepartment = await Department.findByIdAndDelete(id);
    targetDepartment
      ? res
          .status(200)
          .json({ message: "deleted successfully", targetDepartment })
      : res.sendStatus(400);
  } catch (error) {
    res
      .status(error.status || 500)
      .send(error.message || "internal server problem!");
  }
};
const getOneDepartment = async (req, res) => {
  const { id } = req.params;
  try {
    const targetDepartment = await Department.findById(id);
    const departmentEmployees = await Employee.find({
      departementId: targetDepartment?.id,
    });
    targetDepartment
      ? res.status(200).json({
          message1: "employees of this department",
          departmentEmployees,

          message2: "here is the department",
          targetDepartment,
        })
      : res.sendStatus(404);
  } catch (error) {
    res
      .status(error.status || 500)
      .send(error.message || "internal server problem");
  }
};
module.exports = {
  newDepartment,
  listOfDepartment,
  updateDepartment,
  deleteDepartment,
  getOneDepartment,
};
