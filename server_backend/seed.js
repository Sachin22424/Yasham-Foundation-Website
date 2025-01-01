const mongoose = require('mongoose');
const MentorTestimonial = require('./Models/mentorTestimonialModel');
require('dotenv').config();

const initialMentorTestimonialData = [
    {
        name: "Jessica Doe",
        position: "Manager, Company",
        image: "path/to/jessica-image.jpg",
        feedback: "Praesent volutpat diam lacus, fringilla orci vitae, hendrerit odio. Aenean venenatis, mauris et suscipit venenatis, augue lectus gravida dui, eget commodo mauris ex non risus."
    },
    {
        name: "John Doe",
        position: "Manager, Company",
        image: "path/to/john-image.jpg",
        feedback: "Praesent volutpat diam lacus, fringilla orci vitae, hendrerit odio. Aenean venenatis, mauris et suscipit venenatis, augue lectus gravida dui, eget commodo mauris ex non risus."
    },
    {
        name: "David Doe",
        position: "Manager, Company",
        image: "path/to/david-image.jpg",
        feedback: "Praesent volutpat diam lacus, fringilla orci vitae, hendrerit odio. Aenean venenatis, mauris et suscipit venenatis, augue lectus gravida dui, eget commodo mauris ex non risus."
    },
    {
        name: "Lana Steiner",
        position: "Manager, Company",
        image: "path/to/lana-image.jpg",
        feedback: "Praesent volutpat diam lacus, fringilla orci vitae, hendrerit odio. Aenean venenatis, mauris et suscipit venenatis, augue lectus gravida dui, eget commodo mauris ex non risus."
    },
    {
        name: "Emily Donnavan",
        position: "Manager, Company",
        image: "path/to/emily-image.jpg",
        feedback: "Praesent volutpat diam lacus, fringilla orci vitae, hendrerit odio. Aenean venenatis, mauris et suscipit venenatis, augue lectus gravida dui, eget commodo mauris ex non risus."
    },
    {
        name: "Sasha Kindred",
        position: "Manager, Company",
        image: "path/to/sasha-image.jpg",
        feedback: "Praesent volutpat diam lacus, fringilla orci vitae, hendrerit odio. Aenean venenatis, mauris et suscipit venenatis, augue lectus gravida dui, eget commodo mauris ex non risus."
    }
];

const seedDB = async () => {
    const uri = process.env.ATLAS_URI;

    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        await MentorTestimonial.deleteMany({});
        await MentorTestimonial.insertMany(initialMentorTestimonialData);

        console.log('Mentor testimonials data seeded successfully');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding data:', error);
        mongoose.connection.close();
    }
};

seedDB();