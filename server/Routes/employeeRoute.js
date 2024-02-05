const express = require("express");
const router = express.Router();
const employeeController = require("../Controllers/employeeController");

router
  .route("/")
  .get(employeeController.listOfEmployees)
  .post(employeeController.addEmployee);
router
  .route("/:id")
  .put(employeeController.updateEmployee)
  .get(employeeController.getOneEmployee)
  .delete(employeeController.deleteEmployee);

module.exports = router;
