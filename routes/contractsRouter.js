const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const {
  getAllContracts,
  getContract,
  addContract,
  updateContract,
  deleteContract,
} = require("../controllers/contractsController.js");

router.get("/", asyncHandler(getAllContracts));
router.get("/:id", asyncHandler(getContract));
router.post("/", asyncHandler(addContract));
router.put("/:id", asyncHandler(updateContract));
router.delete("/:id", asyncHandler(deleteContract));

module.exports = router;