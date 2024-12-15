const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
    sliderImages: [String],
    story: {
        title: String,
        description: String,
    },
    events: [
        {
            name: String,
            description: String,
        }
    ],
    video: {
        url: String,
        title: String,
        description: String,
    },
    mainevent: {
        image: String,
        name: String,
        description: String,
    },
    upcomingEvent: {
        name: String,
        description: String,
    },
    newSliderImage:{
        image: String,
    }
}, { timestamps: true });

module.exports = mongoose.model('Home', homeSchema);