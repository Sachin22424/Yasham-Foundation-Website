const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    image: {
        url: {
            type: String,
            required: true
        },
        width: {
            type: Number,
            required: true
        },
        height: {
            type: Number,
            required: true
        }
    },
    heading: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    buttonText: {
        type: String,
        required: true
    },
    articleUrl: {
        type: String,
        required: true
    }
});

const News = mongoose.model('News', newsSchema);

module.exports = News;