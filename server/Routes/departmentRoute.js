const express = require("express");
const router = express.Router();
const departmentController = require("../Controllers/departmentController");

router.get("/", departmentController.listOfDepartment);
router.post("/", departmentController.newDepartment);
module.exports = router;
