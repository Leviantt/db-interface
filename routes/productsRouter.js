const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const {
  getAllProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productsController.js");

router.get("/", asyncHandler(getAllProducts));
router.get("/:id", asyncHandler(getProduct));
router.post("/", asyncHandler(addProduct));
router.put("/:id", asyncHandler(updateProduct));
router.delete("/:id", asyncHandler(deleteProduct));

module.exports = router;
