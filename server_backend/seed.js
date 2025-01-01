const mongoose = require('mongoose');
const SEM = require('./Models/semModel');
require('dotenv').config();

const initialSEMData = [
    {
        title: "Swachh English Mission",
        description: "Yasham addresses limited speaking and writing skills by providing coaching through trained volunteers. This initiative benefits students in preparing for the highly competitive professional world, whether in mainstream high-profile professions or blue-collar jobs, which are the backbone of any country.",
        images: [
            {
                url: "path/to/SEM1.jpg",
                caption: "First slide label"
            },
            {
                url: "path/to/SEM2.jpg",
                caption: "Second slide label"
            }
        ]
    }
];

const seedDB = async () => {
    const uri = process.env.ATLAS_URI;

    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        await SEM.deleteMany({});
        await SEM.insertMany(initialSEMData);

        console.log('SEM data seeded successfully');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding data:', error);
        mongoose.connection.close();
    }
};

seedDB();