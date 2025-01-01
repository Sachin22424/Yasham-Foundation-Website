const mongoose = require('mongoose');

const studentTestimonialSchema = new mongoose.Schema({
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

const StudentTestimonial = mongoose.model('StudentTestimonial', studentTestimonialSchema);

module.exports = StudentTestimonial;