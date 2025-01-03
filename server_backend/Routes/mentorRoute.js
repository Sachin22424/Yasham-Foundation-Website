const express = require('express');
const router = express.Router();
const { createMentor, getMentors, deleteAllMentors, exportMentorsToExcel } = require('../Controllers/mentorController.js');

// Route to get all mentor applications
router.get('/', getMentors);

// Route to create new mentor application
router.post('/', createMentor);

// Route to delete all mentor applications
router.delete('/', deleteAllMentors);

// Route to export mentor applications to Excel
router.get('/export', exportMentorsToExcel);

module.exports = router;