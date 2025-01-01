const mongoose = require('mongoose');

const shbSchema = new mongoose.Schema({
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

const SHB = mongoose.model('SHB', shbSchema);

module.exports = SHB;