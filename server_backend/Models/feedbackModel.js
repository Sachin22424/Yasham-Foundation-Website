const mongoose = require('mongoose');

// Define schema for feedback
const feedbackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false // name can be optional in feedback
    },
    email: {
        type: String,
        required: false // email can be optional in feedback
    },
    subject: {
        type: String,
        required: false // subject can be optional in feedback
    },
    message: {
        type: String,
        required: false // message can be optional in feedback
    },
}, { timestamps: true });

// Create the Feedback model
const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
