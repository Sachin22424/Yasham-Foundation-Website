const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    mail: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    linkedin: {
        type: String,
        required: true
    },
    facebook: {
        type: String,
        required: true
    },
    instagram: {
        type: String,
        required: true
    },
    feedbacktitle:{
        type: String,
        required: true
    },
    feedbackmessage:{
        type: String,
        required: true
    }
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;