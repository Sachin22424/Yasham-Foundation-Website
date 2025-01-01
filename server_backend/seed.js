const mongoose = require('mongoose');
const News = require('./Models/newsModel');
require('dotenv').config();

const initialNewsData = [
    {
        image: {
            url: "path/to/news.png",
            width: 400,
            height: 300
        },
        heading: "Latest News",
        description: "The pandemic has made it hard for many students to continue their education, especially those preparing for JEE and NEET exams. However, numerous NGOs and initiatives have risen to help these students by providing them with study materials, mentorship, and financial support to keep their dreams alive. The drive to ensure that students can continue their education without facing a financial burden has helped thousands of students. Various NGOs are actively engaging with government and private sectors to provide resources, including free coaching classes, online study materials, and even helping with exam fees.",
        buttonText: "Read Full Article",
        articleUrl: "https://mumbaimirror.indiatimes.com/mumbai/other/keeping-their-jee-neet-dreams-alive/articleshow/78962390.cms"
    }
];

const seedDB = async () => {
    const uri = process.env.ATLAS_URI;

    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        await News.deleteMany({});
        await News.insertMany(initialNewsData);

        console.log('News data seeded successfully');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding data:', error);
        mongoose.connection.close();
    }
};

seedDB();