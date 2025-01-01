const mongoose = require('mongoose');

const ycmSchema = new mongoose.Schema({
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

const YCM = mongoose.model('YCM', ycmSchema);

module.exports = YCM;