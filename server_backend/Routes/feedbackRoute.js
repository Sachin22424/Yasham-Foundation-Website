const express = require('express');
const router = express.Router();
const { createFeedback, getFeedbacks, deleteAllFeedbacks } = require('../Controllers/feedbackController.js');

// Route to get all feedbacks
router.get('/', getFeedbacks);

// Route to create new feedback
router.post('/', createFeedback);
router.delete('/', deleteAllFeedbacks);

module.exports = router;