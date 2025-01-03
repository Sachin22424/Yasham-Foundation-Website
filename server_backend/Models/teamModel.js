const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    position: { type: String, required: true },
    image: { type: String, required: true },
    imageWidth: { type: String, required: true },
    imageHeight: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true } // 'founder' or 'support'
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;