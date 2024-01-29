const Employee = require("../Models/employees");

const listOfEmployees = async (req, res) => {
  try {
    const list = await Employee.find();
    list.length
      ? res.status(200).json({ message: "here are the list", list })
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
module.exports = { addEmployee, listOfEmployees };
