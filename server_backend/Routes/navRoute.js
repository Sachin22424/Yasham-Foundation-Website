const express = require('express');
const router = express.Router();
const { getNavInfo, updateNavInfo } = require('../Controllers/navController');

// Route to get navbar info
router.get('/', getNavInfo);

// Route to update navbar info
router.put('/:id', updateNavInfo);

module.exports = router;