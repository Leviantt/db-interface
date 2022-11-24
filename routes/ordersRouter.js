const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const {
  getAllOrders,
  getOrder,
  addOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/ordersController.js");

router.get("/", asyncHandler(getAllOrders));
router.get("/:id", asyncHandler(getOrder));
router.post("/", asyncHandler(addOrder));
router.put("/:id", asyncHandler(updateOrder));
router.delete("/:id", asyncHandler(deleteOrder));

module.exports = router;
