const SHB = require('../Models/shbModel');

// Get SHB info
const getSHBInfo = async (req, res) => {
    try {
        const shb = await SHB.find();
        res.json(shb);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create or update SHB info
const updateSHBInfo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, images } = req.body;
        const shb = await SHB.findByIdAndUpdate(id, { title, description, images }, { new: true, upsert: true });
        res.json(shb);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getSHBInfo,
    updateSHBInfo
};