const mongoose = require('mongoose');
const Home = require('./Models/homeModel');
const Contact = require('./Models/contactModel'); // Import the Contact model
require('dotenv').config();

const seedData = async () => {
    const uri = process.env.ATLAS_URI;

    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Seed home data
        const initialHomeData = {
            sliderImages: ["slider1.jpg", "slider2.jpg", "slider3.jpg"],
            story: {
                title: "Story About What We Do",
                description: "Yasham works every single day to empower society holistically, through changes big or small. We work predominantly in the field of education to sharpen young minds and make them a better version of themselves, irrespective of where they come from.",
            },
            events: [
                { name: "Saathi Haath Badhana", description: "Details of event 1..." },
                { name: "Hum Honge Kaamyab", description: "Details of event 2..." },
                { name: "Swacch English Mission", description: "Details of event 3..." },
            ],
            video: {
                url: "https://www.youtube.com/embed/mg9JoVv4w8E",
                title: "Educate. Enlighten. Empower.",
                description: "To be able to guide and assist...",
            },
        };

        await Home.create(initialHomeData);
        console.log("Initial home data seeded successfully!");

        // Seed contact data
        const initialContactData = {
            mail: 'yashamfoundation@gmail.com',
            number: '+91 9817545817',
            linkedin: 'https://www.linkedin.com/company/yasham-foundation/',
            facebook: 'https://www.facebook.com/100069949045484/posts/104813755189149/',
            instagram: 'https://www.instagram.com/yasham_foundation/'
        };

        await Contact.create(initialContactData);
        console.log("Initial contact data seeded successfully!");

        mongoose.disconnect();
    } catch (error) {
        console.error("Error seeding data:", error);
        mongoose.disconnect();
    }
};

seedData();