const HHK = require('../Models/hhkModel');

// Get HHK info
const getHHKInfo = async (req, res) => {
    try {
        const hhk = await HHK.find();
        res.json(hhk);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create or update HHK info
const updateHHKInfo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, images } = req.body;
        const hhk = await HHK.findByIdAndUpdate(id, { title, description, images }, { new: true, upsert: true });
        res.json(hhk);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getHHKInfo,
    updateHHKInfo
};