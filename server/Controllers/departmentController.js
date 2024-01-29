const Department = require("../Models/departments");

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
module.exports = { newDepartment, listOfDepartment };
