const express = require("express");
const router = express.Router();
const departmentController = require("../Controllers/departmentController");

router
  .route("/")
  .get(departmentController.listOfDepartment)
  .post(departmentController.newDepartment);
router
  .route("/:id")
  .put(departmentController.updateDepartment)
  .delete(departmentController.deleteDepartment)
  .get(departmentController.getOneDepartment);
module.exports = router;
