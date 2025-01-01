const express = require('express');
const router = express.Router();
const { getMentorTestimonials, updateMentorTestimonial } = require('../Controllers/mentorTestimonialController.js');

// Route to get all mentor testimonials
router.get('/', getMentorTestimonials);

// Route to update mentor testimonial by ID
router.put('/:id', updateMentorTestimonial);

module.exports = router;