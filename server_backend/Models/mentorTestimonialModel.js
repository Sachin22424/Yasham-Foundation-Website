const mongoose = require('mongoose');

const mentorTestimonialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    feedback: {
        type: String,
        required: true
    }
});

const MentorTestimonial = mongoose.model('MentorTestimonial', mentorTestimonialSchema);

module.exports = MentorTestimonial;