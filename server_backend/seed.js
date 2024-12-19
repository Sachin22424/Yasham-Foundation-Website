const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const About = require('./Models/aboutModel'); // Import the About model
const User = require('./Models/userModel'); // Import the User model
require('dotenv').config();

const seedMissionData = async () => {
    const uri = process.env.ATLAS_URI;

    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Seed mission data
        const missionData = {
            missiondescription1: "We aim to educate, enlighten, and empower society. Our mission is to reach young minds, sharpen their skills, and uplift the community through education and support, so they can thrive and inspire future generations.",
            missiondescription2: "Yasham Foundation works tirelessly every day to foster growth, compassion, and resilience. Our goal is to support children from all walks of life, nurturing them to become the best version of themselves, and empowering families across the country to achieve a better tomorrow.",
            missionurl: "https://www.youtube.com/watch?v=Xnr5AVAnAw0"
        };

        await About.updateOne({}, { mission: missionData }, { upsert: true });
        console.log("Mission data seeded successfully!");

        // Seed initial user data
        const email = "yashamfoundation@gmail.com";
        const password = "yashamcontent@8170";

        const userExists = await User.findOne({ email });

        if (!userExists) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const user = new User({
                email,
                password: hashedPassword
            });

            await user.save();
            console.log("Initial user seeded successfully!");
        } else {
            console.log("User already exists, skipping user seeding.");
        }

        mongoose.disconnect();
    } catch (error) {
        console.error("Error seeding data:", error);
        mongoose.disconnect();
    }
};

seedMissionData();