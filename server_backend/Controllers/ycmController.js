const YCM = require('../Models/ycmModel');

// Get YCM info
const getYCMInfo = async (req, res) => {
    try {
        const ycm = await YCM.find();
        res.json(ycm);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create or update YCM info
const updateYCMInfo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, images } = req.body;
        const ycm = await YCM.findByIdAndUpdate(id, { title, description, images }, { new: true, upsert: true });
        res.json(ycm);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getYCMInfo,
    updateYCMInfo
};