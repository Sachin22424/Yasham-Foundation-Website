const express = require('express');
const router = express.Router();
const { getSEMInfo, updateSEMInfo } = require('../Controllers/semController.js');

// Route to get SEM info
router.get('/', getSEMInfo);

// Route to update SEM info by ID
router.put('/:id', updateSEMInfo);

module.exports = router;