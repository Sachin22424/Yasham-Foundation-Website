const mongoose = require('mongoose');
const Nav = require('./Models/navModel');
require('dotenv').config();

const uri = process.env.ATLAS_URI; // MongoDB URI

const seedNavData = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const navData = {
            heading: 'Yasham Foundation',
            dropdowns: [
                {
                    title: 'Our Story',
                    links: [
                        { name: 'About Us', url: '/about' },
                        { name: 'Our Team', url: '/team' },
                        { name: 'Our Mission', url: '/mission' }
                    ]
                },
                {
                    title: 'Our Work',
                    links: [
                        { name: 'Yasham Centre Model', url: '/ycm' },
                        { name: 'Saathi Haath Badhana', url: '/shb' },
                        { name: 'Sunn Zara', url: '/sz' },
                        { name: 'Hum Honge Kaamyab', url: '/hhk' },
                        { name: 'Swacch English Mission', url: '/sem' }
                    ]
                },
                {
                    title: 'Our Impact',
                    links: [
                        { name: 'Student Testimonials', url: '/studentTestimonial' },
                        { name: 'Mentor Testimonials', url: '/mentorTestimonial' },
                        { name: 'Yasham in News', url: '/news' }
                    ]
                },
                {
                    title: 'Get Involved',
                    links: [
                        { name: 'Sponsor', url: '#' },
                        { name: 'Support Us', url: '/support' },
                        { name: 'Teach/Mentor', url: '/mentorform' }
                    ]
                }
            ]
        };

        await Nav.deleteMany(); // Clear existing data
        await Nav.create(navData); // Insert new data

        console.log('Nav data seeded successfully');
        mongoose.connection.close();
    } catch (err) {
        console.error('Error seeding nav data:', err);
        mongoose.connection.close();
    }
};

seedNavData();