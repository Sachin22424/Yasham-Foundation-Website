const mongoose = require('mongoose');
const Contact = require('./Models/contactModel'); // Import the Contact model
const Home = require('./Models/homeModel'); // Import the Home model
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const seedContactData = async () => {
    const uri = process.env.ATLAS_URI;

    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Seed contact data
        const contactData = {
            mail: "yashamfoundation@gmail.com",
            number: "+91 9817545817",
            linkedin: "https://www.linkedin.com/company/yasham-foundation/",
            facebook: "https://www.facebook.com/100069949045484/posts/104813755189149/",
            instagram: "https://www.instagram.com/yasham_foundation/",
            feedbacktitle: "Thank you",
            feedbackmessage: "we will reach you soon"
        };

        await Contact.updateOne({}, contactData, { upsert: true });

        console.log('Contact data seeded successfully');
        
        // Read and convert the image file to a buffer
        const imagePath = path.join(__dirname, 'path_to_your_image', 'your_image.jpg');
        const imageBuffer = fs.readFileSync(imagePath);

        // Seed home data
        const seedData = {
            story: {
                title: "What We Do",
                description: "To be able to guide and assist the many promising minds is one of the most gratifying feelings that motivates us at Yasham. Yasham predominantly works in education to sharpen young minds today so that they might red-pencil the assigned labels. To achieve our vision, we actively mediate between a child's aspirations and the acquisition of their goals."
            },
            mainevent: {
                image: "https://i.imghippo.com/files/Jvs2309reY.jpg",
                name: "The Main Event",
                description: "Industry. Lorem Ipsum has been the industry's standard dummy text ever since the, Lorem Ipsum has been the industry's standard dummy. Industry. Industry. Lorem Ipsum has been the industry's standard dummy text ever since the"
            },
            events: [
                { name: "Hum Honge Kaamyab", description: "" },
                { name: "Saathi Haath Badhana", description: "" },
                { name: "Swacch English Mission", description: "" }
            ],
            upcomingEvent: {
                name: "Hum Honge Kaamyab",
                description: "Industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown industry. Lorem Ipsum has been the industry's standard dummy, Lorem Ipsum has been the industry's standard dummy. Industry."
            },
            video: {
                url: "https://www.youtube.com/embed/mg9JoVv4w8E",
                title: "Hum Honge Kaamyab",
                description: ""
            },
            newSliderImage: {
                data: imageBuffer,
                contentType: 'image/jpeg'
            }
        };

        await Home.updateOne({}, seedData, { upsert: true });

        console.log('Home data seeded successfully');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding data:', error);
        mongoose.connection.close();
    }
};

seedContactData();
