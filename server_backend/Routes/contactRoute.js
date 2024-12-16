const express = require('express');
const router = express.Router();
const { getContactInfo, updateContactInfo } = require('../Controllers/contactController');

// Route to get contact info
router.get('/', getContactInfo);

// Route to update contact info by ID
router.put('/:id', updateContactInfo);

module.exports = router;