const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
    title1: {
        type: String,
        required: true
    },
    title2: {
        type: String,
        required: true
    },
    description1: {
        type: String,
        required: true
    },
    description2: {
        type: String,
        required: true
    },
    story: {
        type: String,
        required: true
    },
    donate: {
        title: {
            type: String,
            required: true
        },
        point1: {
            type: String,
            required: true
        },
        point2: {
            type: String,
            required: true
        },
        point3: {
            type: String,
            required: true
        }
    },
    volunteer: {
        title: {
            type: String,
            required: true
        },
        point1: {
            type: String,
            required: true
        },
        point2: {
            type: String,
            required: true
        },
        point3: {
            type: String,
            required: true
        },
        point4: {
            type: String,
            required: true
        }
    },
    supporttitle: {
        type: String,
        required: true
    },
    mission: {
        missiondescription1: {
            type: String,
            required: true
        },
        missiondescription2: {
            type: String,
            required: true
        },
        missionurl: {
            type: String,
            required: true
        }
    },
    image: {
        url: {
            type: String,
            required: true
        },
        width: {
            type: String,
            required: true
        },
        height: {
            type: String,
            required: true
        }
    }
});

const About = mongoose.model('About', aboutSchema);

module.exports = About;