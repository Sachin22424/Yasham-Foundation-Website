const express = require('express');
const router = express.Router();
const { getAboutInfo, updateAboutInfo } = require('../Controllers/aboutController.js');

// Route to get about info
router.get('/', getAboutInfo);

// Route to update about info by ID
router.put('/:id', updateAboutInfo);

module.exports = router;