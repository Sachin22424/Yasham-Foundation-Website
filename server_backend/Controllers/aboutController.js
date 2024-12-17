const About = require('../Models/aboutModel');

// Get about info
const getAboutInfo = async (req, res) => {
    try {
        const about = await About.findOne();
        res.json(about);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update about info
const updateAboutInfo = async (req, res) => {
    try {
        const { id } = req.params;
        const { description1, description2, story, donate, volunteer, mission } = req.body;
        const about = await About.findByIdAndUpdate(id, { description1, description2, story, donate, volunteer, mission }, { new: true, upsert: true });
        res.json(about);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAboutInfo,
    updateAboutInfo
};