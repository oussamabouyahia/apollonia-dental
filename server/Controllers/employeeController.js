const Employee = require("../Models/employees");
const Department = require("../Models/departments");
const listOfEmployees = async (req, res) => {
  try {
    const list = await Employee.find();
    const listWithDepartment = await Promise.all(
      list.map(async (e) => {
        const dep = await Department.findById(e.departementId);

        return {
          id: e._id,
          name: e.name,
          surname: e.surname,
          departementName: dep.name,
        };
      })
    );
    list.length
      ? res
          .status(200)
          .json({ message: "here are the list", listWithDepartment })
      : res.status(404).send("list is empty");
  } catch (error) {
    res
      .status(error.status || 500)
      .send(error.message || "internal server problem");
  }
};
const addEmployee = async (req, res) => {
  const { name, surname, departementId } = req.body;
  try {
    const existingEmployee = await Employee.find({ name, surname });
    if (!Object.keys(existingEmployee).length) {
      const newEmployee = new Employee({ name, surname, departementId });
      await newEmployee.save();
      res
        .status(201)
        .json({ message: "a new employee added successfully!", newEmployee });
    } else {
      return res.status(403)
        .send(`an existing employee already registred with a name:
         ${name} and a surname ${surname} `);
    }
  } catch (error) {
    res
      .status(error.status || 500)
      .send(error.message || "internal server problem");
  }
};
const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, surname, departementId } = req.body;
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { name, surname, departementId },
      { new: true }
    );
    updatedEmployee
      ? res
          .status(200)
          .json({ message: "employee updated successfully", updatedEmployee })
      : res
          .status(400)
          .send("error occurred and the target employee was not updated");
  } catch (error) {
    res
      .status(error.status || 500)
      .send(error.message || "internal server problem");
  }
};
const getOneEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const targetEmployee = await Employee.findById(id);
    targetEmployee
      ? res
          .status(200)
          .json({ targetEmployee, message: "employee was found successfully" })
      : res.sendStatus(404);
  } catch (error) {
    res
      .status(error.status || 500)
      .send(error.message || "internal server problem");
  }
};
const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    deletedEmployee
      ? res
          .status(200)
          .json({ message: "employee deleted successfully", deletedEmployee })
      : res
          .status(400)
          .send("something wrong the employee was not deleted successfully");
  } catch (error) {
    res
      .status(error.status || 500)
      .send(error.message || "internal server problem");
  }
};
module.exports = {
  addEmployee,
  listOfEmployees,
  updateEmployee,
  getOneEmployee,
  deleteEmployee,
};
