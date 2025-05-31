const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const homeRoute = require('./Routes/homeRoute');
const contactRoute = require('./Routes/contactRoute');
const aboutRoute = require('./Routes/aboutRoute');
const userRoute = require('./Routes/userRoute');
const feedbackRoute = require('./Routes/feedbackRoute');
const teamRoute = require('./Routes/teamRoute');
const ycmRoute = require('./Routes/ycmRoute');
const shbRoute = require('./Routes/shbRoute');
const szRoute = require('./Routes/szRoute');
const hhkRoute = require('./Routes/hhkRoute');
const semRoute = require('./Routes/semRoute');
const studentTestimonialRoute = require('./Routes/studentTestimonialRoute');
const mentorTestimonialRoute = require('./Routes/mentorTestimonialRoute');
const newsRoute = require('./Routes/newsRoute');
const mentorRoute = require('./Routes/mentorRoute');
const navRoute = require('./Routes/navRoute');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(cors());

app.use('/api/home', homeRoute);
app.use('/api/contact', contactRoute);
app.use('/api/about', aboutRoute);
app.use('/api/users', userRoute);
app.use('/api/feedback', feedbackRoute);
app.use('/api/team', teamRoute);
app.use('/api/ycm', ycmRoute);
app.use('/api/shb', shbRoute);
app.use('/api/sz', szRoute);
app.use('/api/hhk', hhkRoute);
app.use('/api/sem', semRoute);
app.use('/api/student-testimonials', studentTestimonialRoute);
app.use('/api/mentor-testimonials', mentorTestimonialRoute);
app.use('/api/news', newsRoute);
app.use('/api/mentors', mentorRoute);
app.use('/api/nav', navRoute);

app.get('/', (req, res) => {
    res.send('Hello World');
});

const allowedOrigins = [
    'http://localhost:5173',
    'http://www.yashamfoundaon.org',
    'https://www.yashamfoundaon.org'
];

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps, curl, etc.)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            return callback(null, true);
        } else {
            return callback(new Error('Not allowed by CORS'));
        }
    }
}));

const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connection established...');
}).catch(err => console.log(err));