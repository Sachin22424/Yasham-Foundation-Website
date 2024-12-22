const mongoose = require('mongoose');
const Contact = require('./Models/contactModel'); // Import the Contact model
require('dotenv').config();

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
        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding contact data:', error);
        mongoose.connection.close();
    }
};

seedContactData();