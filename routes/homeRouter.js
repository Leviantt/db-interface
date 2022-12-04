const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const { getStatistics } = require("../controllers/homeController.js");

router.get("/", asyncHandler(getStatistics));

module.exports = router;