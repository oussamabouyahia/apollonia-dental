const express = require("express");
const router = express.Router();
const employeeController = require("../Controllers/employeeController");
router.get("/", employeeController.listOfEmployees);
router.post("/", employeeController.addEmployee);
module.exports = router;
