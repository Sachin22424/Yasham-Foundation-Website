const express = require('express');
const router = express.Router();
const { createMentor, getMentors, deleteAllMentors } = require('../Controllers/mentorController.js');

// Route to get all mentor applications
router.get('/', getMentors);

// Route to create new mentor application
router.post('/', createMentor);

// Route to delete all mentor applications
router.delete('/', deleteAllMentors);

module.exports = router;