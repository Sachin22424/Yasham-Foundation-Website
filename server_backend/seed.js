const mongoose = require('mongoose');
const YCM = require('./Models/ycmModel');
require('dotenv').config();

const initialYCMData = [
    {
        title: "Centre Model - Cuffe Parade123",
        description: "The centre model is an after-school program which supports the underprivileged children of the nearby communities. Trained teachers, adult volunteers, and students from privileged schools conduct English, Mathematics and Science classes. Value systems, Character formation, Personality development, and the importance of hygiene and cleanliness are also taught to them. The final goal is to create a strong foundation so that every child is groomed holistically to channel into the mainstream. Our main centre is at G.D Somani (IGSC) and B D Somani(I. B) Colaba, Mumbai. Other centres in Worli, Tardeo, Grant Road, Marine Lines, Forgetee Street, and Sion areas of Mumbai.",
        images: [
            {
                url: "path/to/YCM1.jpg",
                caption: "First slide label"
            },
            {
                url: "path/to/YCM2.jpg",
                caption: "Second slide label"
            },
            {
                url: "path/to/YCM3.jpg",
                caption: "Third slide label"
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

        await YCM.deleteMany({});
        await YCM.insertMany(initialYCMData);

        console.log('YCM data seeded successfully');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding data:', error);
        mongoose.connection.close();
    }
};

seedDB();