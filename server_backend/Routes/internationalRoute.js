// routes/internationalRoutes.js
const express = require("express");
const router = express.Router();
const {
  getInternationalInfo,
  getInternationalById,
  updateInternationalInfo,
} = require("../Controllers/internationalController");

// Get all programs
router.get("/", getInternationalInfo);

// Get single program by ID
router.get("/:id", getInternationalById);

// Update program by ID
router.put("/:id", updateInternationalInfo);

module.exports = router;
