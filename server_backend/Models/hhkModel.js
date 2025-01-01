const mongoose = require('mongoose');

const hhkSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: [
        {
            url: {
                type: String,
                required: true
            },
            caption: {
                type: String,
                required: true
            }
        }
    ]
});

const HHK = mongoose.model('HHK', hhkSchema);

module.exports = HHK;