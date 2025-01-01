const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const homeRoute = require('./Routes/homeRoute');
const contactRoute = require('./Routes/contactRoute');
const aboutRoute = require('./Routes/aboutRoute');
const userRoute = require('./Routes/userRoute');
const feedbackRoute = require('./Routes/feedbackRoute');
const teamRoute = require('./Routes/teamRoute');
const ycmRoute = require('./Routes/ycmRoute'); // Add this line
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
app.use('/api/ycm', ycmRoute); // Add this line for YCM routes

app.get('/', (req, res) => {
    res.send('Hello World');
});

const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI; // MongoDB URI

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connection established...');
}).catch(err => console.log(err));