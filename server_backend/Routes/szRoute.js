const express = require('express');
const router = express.Router();
const { getSZInfo, updateSZInfo } = require('../Controllers/szController');

// Route to get SZ info
router.get('/', getSZInfo);

// Route to update SZ info by ID
router.put('/:id', updateSZInfo);

module.exports = router;