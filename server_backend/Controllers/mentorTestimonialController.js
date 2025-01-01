const MentorTestimonial = require('../Models/mentorTestimonialModel');

// Get all mentor testimonials
const getMentorTestimonials = async (req, res) => {
    try {
        const testimonials = await MentorTestimonial.find();
        res.json(testimonials);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create or update mentor testimonial
const updateMentorTestimonial = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, position, image, feedback } = req.body;
        const testimonial = await MentorTestimonial.findByIdAndUpdate(id, { name, position, image, feedback }, { new: true, upsert: true });
        res.json(testimonial);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getMentorTestimonials,
    updateMentorTestimonial
};