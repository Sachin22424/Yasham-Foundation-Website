const mongoose = require('mongoose');
const Team = require('../server_backend/Models/teamModel');
require('dotenv').config();

const founderMembers = [
    {
        name: "Sunita Mandelia",
        position: "Alumna",
        image: "path/to/founder.png",
        description: "An alumna of The J.B. Petit High School, is a gold medallist Honours student in Psychology from St. Xavier's College, Mumbai. Encompassing numerous roles from a drama artist, a singer, a dancer, a creative writer and a poet, Rotarian Ms. Mandelia is a die-hard patriot and pro-educationist who passionately and actively works at grassroots levels to empower and create holistic societal change. As an active member of many social and charitable organizations working on medical and educational projects, Ms.'s diverse set of talents and dedication to social causes make her a well-rounded and socially responsible individual who actively contributes to the community. Her successes include her book of poetries' Bhanwar' published by Write Place Publications, an initiative by Crossword Bookstores Limited.",
        type: "founder"
    },
    {
        name: "Smita Kaushal",
        position: "Accountant and Lawyer",
        image: "path/to/founder.png",
        description: "As a chartered accountant and lawyer, Smita Kausal is a highly qualified professional with a background in both finance and law, and she contributes her expertise to various multinational organizations. She has extensive experience in the social sector through her involvement with several not-for-profit organizations in Mumbai. Ms. Kausal's combination of financial and legal expertise, along with her commitment to the social sector, makes her a professional who excels in her career and actively contributes to the community through her involvement in not-for-profit initiatives in Mumbai.",
        type: "founder"
    },
    {
        name: "Shilpa Bhagat",
        position: "Lead Coordinator",
        image: "path/to/founder.png",
        description: "Ms Bhagat is a qualified management graduate who has previously worked with HDFC Bank. She is Mrs India World 2013. She is involved with several not-for-profit organizations working in the areas of education and cancer relief.",
        type: "founder"
    },
];

const supportMembers = [
    {
        name: "Jaya Rajdev",
        position: "Educator and Counsellor",
        image: "path/to/supportmem.png",
        description: "A counsellor, author, and educator with a passion for personal growth and community service. With over 8 years in Learning and Development and a corporate background spanning 12 years, Jaya specializes in equipping individuals and organizations with essential life skills and emotional intelligence. Holding a Master's Degree in Human Development and a Postgraduate Diploma in Counseling Skills, her expertise is grounded in theoretical knowledge and practical experience. As the co-author of Celebrating Relationships, she has mentored aspiring writers through innovative programs like the Coaching Circle. Beyond her professional roles, Jaya is dedicated to community engagement, actively contributing to NGOs to build sustainable communities. She finds solace in the arts, indulging in practices like painting Dot Mandalas and pottery, while her love for literature and travel enriches her counseling approach. Connect with Jaya today to embark on a journey of growth and transformation.",
        type: "support"
    },
    {
        name: "Subhashini Harikrishnan",
        position: "Philanthropist",
        image: "path/to/founder.png",
        description: "Subhashini Harikrishnan is an philanthropist, Partner in Blue Lotus capital Fund and Project Head in Yasham foundation for the Hum Honge Kamyab project. She has done her graduation in Engineering and Masters in Business Administration. Her patriotism towards nation has made her to join Yasham to guide every student in their social and academic growth. Her passion towards science made her to do a extensive research on quantum physics which in turn helped her in her spiritual evolution.She strives to bring her nation forward through education and build a co operative community.",
        type: "support"
    },
    {
        name: "Geeta Vora",
        position: "Career Counsellor",
        image: "path/to/founder.png",
        description: "A career counsellor with a wide experience of work in logistics, production, computers and construction. Worked in corporates like Gati, LnT, Infosys and Devansh. 1.5 years of working in US as a programmer for Capital One. Started an educational setup in 2011 with an intent to make Math and Science fun for young kids via multiple classes. Have taken additional certifications in career counselling, psychology and emotional therapies from various platforms over the years. Also working with an NGO Yasham to reach out career counselling benefits to financially weaker societies and schools in Mumbai.",
        type: "support"
    },
];

const seedDB = async () => {
    const uri = process.env.ATLAS_URI;

    try {
        await mongoose.connect(uri);

        await Team.deleteMany({});
        await Team.insertMany([...founderMembers, ...supportMembers]);

        console.log('Team data seeded successfully');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding data:', error);
        mongoose.connection.close();
    }
};

seedDB();