const mongoose = require('mongoose');

const semSchema = new mongoose.Schema({
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

const SEM = mongoose.model('SEM', semSchema);

module.exports = SEM;