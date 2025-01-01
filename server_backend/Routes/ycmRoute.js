const express = require('express');
const router = express.Router();
const { getYCMInfo, updateYCMInfo } = require('../Controllers/ycmController.js');

// Route to get YCM info for thar
router.get('/', getYCMInfo);

// Route to update YCM info by ID
router.put('/:id', updateYCMInfo);

module.exports = router;