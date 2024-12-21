const mongoose = require('mongoose');
const Contact = require('./models/Contact'); // Adjust the path as needed

const seedContactData = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/yasham', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const initialContactData = {
            mail: 'yashamfoundation@gmail.com',
            number: '+91 9817545817'
        };

        await Contact.create(initialContactData);
        console.log("Initial contact data seeded successfully!");
        mongoose.disconnect();
    } catch (error) {
        console.error("Error seeding contact data:", error);
        mongoose.disconnect();
    }
};

seedContactData();