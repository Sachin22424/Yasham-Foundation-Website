const express = require('express');
const router = express.Router();
const { getSHBInfo, updateSHBInfo } = require('../Controllers/shbController');

// Route to get SHB info
router.get('/', getSHBInfo);

// Route to update SHB info by ID
router.put('/:id', updateSHBInfo);

module.exports = router;