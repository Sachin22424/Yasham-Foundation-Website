const express = require('express');
const router = express.Router();
const { getFeedbacks, createFeedback, deleteAllFeedbacks, exportFeedbacksToExcel } = require('../Controllers/feedbackController');

// Route to get all feedbacks
router.get('/', getFeedbacks);

// Route to create new feedback
router.post('/', createFeedback);

// Route to delete all feedbacks
router.delete('/', deleteAllFeedbacks);

// Route to export feedbacks to Excel
router.get('/export', exportFeedbacksToExcel);

module.exports = router;