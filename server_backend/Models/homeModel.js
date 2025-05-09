const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
    sliderImages: [String],
    story: {
        title: [
            {
                word: String,
                color: String
            }
        ],
        description: String,
        button: String,
        pointer1image: { url: String, width: String, height: String },
        pointer1title: String,
        pointer1description: String,
        pointer2image: { url: String, width: String, height: String },
        pointer2title: String,
        pointer2description: String,
        pointer3image: { url: String, width: String, height: String },
        pointer3title: String,
        pointer3description: String,
        pointer4image: { url: String, width: String, height: String },
        pointer4title: String,
        pointer4description: String,
    },
    events: [
        {
            name: String,
            description: String,
            imageUrl: String,
            imageWidth: String,
            imageHeight: String,
            videoUrl: String,
            videoWidth: String,
            videoHeight: String
        }
    ],
    video: {
        url: String,
        title: String,
        description: String,
        width: String,
        height: String
    },
    mainevent: [
        {
            image: String,
            height: String,
            width: String,
            name: String,
            form: String,
            description: String,
        }
    ],
    upcomingEvent: {
        name: String,
        description: String,
    },
    newSliderImage: {
        image: String,
    },
    testimonials: [
        {
            name: String,
            role: String,
            quote: String,
        }
    ],
    ourImpact: {
        image: String,
        height: String,
        width: String,
        title1: String,
        title2: String,
        description: String,
    }
}, { timestamps: true });

module.exports = mongoose.model('Home', homeSchema);