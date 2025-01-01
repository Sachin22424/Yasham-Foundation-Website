const StudentTestimonial = require('../Models/studentTestimonialModel');

// Get all student testimonials
const getStudentTestimonials = async (req, res) => {
    try {
        const testimonials = await StudentTestimonial.find();
        res.json(testimonials);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create or update student testimonial
const updateStudentTestimonial = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, position, image, feedback } = req.body;
        const testimonial = await StudentTestimonial.findByIdAndUpdate(id, { name, position, image, feedback }, { new: true, upsert: true });
        res.json(testimonial);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getStudentTestimonials,
    updateStudentTestimonial
};