const express = require('express');
const router = express.Router();
const teamController = require('../Controllers/teamController');

router.get('/', teamController.getAllMembers);
router.post('/', teamController.createMember);
router.put('/', teamController.updateAllMembers); // Add this line

module.exports = router;