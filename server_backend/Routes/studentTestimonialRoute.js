const express = require('express');
const router = express.Router();
const { getStudentTestimonials, updateStudentTestimonial } = require('../Controllers/studentTestimonialController.js');

// Route to get all student testimonials
router.get('/', getStudentTestimonials);

// Route to update student testimonial by ID
router.put('/:id', updateStudentTestimonial);

module.exports = router;