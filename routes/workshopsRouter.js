const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const {
  getAllWorkshops,
  getWorkshop,
  addWorkshop,
  updateWorkshop,
  deleteWorkshop,
} = require("../controllers/workshopsController.js");

router.get("/", asyncHandler(getAllWorkshops));
router.get("/:id", asyncHandler(getWorkshop));
router.post("/", asyncHandler(addWorkshop));
router.put("/:id", asyncHandler(updateWorkshop));
router.delete("/:id", asyncHandler(deleteWorkshop));

module.exports = router;