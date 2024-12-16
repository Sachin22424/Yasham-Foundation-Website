const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const homeRoute = require('./Routes/homeRoute');
const contactRoute = require('./Routes/contactRoute'); // Add this line

const app = express();
require('dotenv').config();

app.use(express.json());
app.use(cors());

app.use('/api/home', homeRoute);
app.use('/api/contact', contactRoute); // Add this line

app.get('/' , (req, res) => {
    res.send('!dfx!Hello World');
});

const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI; // MongoDB URI

app.listen(port , (req, res) => {
    console.log(`Server is running on port ${port}`);
});

mongoose.connect(uri , {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB Connected established...');
}).catch(err => console.log(err));