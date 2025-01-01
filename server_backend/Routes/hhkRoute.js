const express = require('express');
const router = express.Router();
const { getHHKInfo, updateHHKInfo } = require('../Controllers/hhkController.js');

// Route to get HHK info
router.get('/', getHHKInfo);

// Route to update HHK info by ID
router.put('/:id', updateHHKInfo);

module.exports = router;