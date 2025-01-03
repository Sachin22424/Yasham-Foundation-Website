const express = require('express');
const router = express.Router();
const teamController = require('../Controllers/teamController');

router.get('/', teamController.getAllMembers);
router.post('/', teamController.createMember);
router.put('/:id', teamController.updateMember); // Add this line for updating a specific member
router.delete('/:id', teamController.deleteMember); // Add this line for deleting a specific member
router.put('/', teamController.updateAllMembers); // This line is for updating all members

module.exports = router;