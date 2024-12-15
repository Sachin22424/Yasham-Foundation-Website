const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
require('dotenv').config();

app.use(express.json());
app.use(cors());


const homeRoute = require('./Routes/homeRoute');
app.use('/api/home', homeRoute);


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