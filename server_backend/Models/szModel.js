const mongoose = require('mongoose');

const szSchema = new mongoose.Schema({
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

const SZ = mongoose.model('SZ', szSchema);

module.exports = SZ;