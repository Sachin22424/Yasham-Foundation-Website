const express = require('express');
const router = express.Router();
const teamController = require('../Controllers/teamController');

router.get('/', teamController.getAllMembers);
router.post('/', teamController.createMember);

module.exports = router;