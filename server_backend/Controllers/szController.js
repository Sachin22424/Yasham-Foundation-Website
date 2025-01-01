const SZ = require('../Models/szModel');

// Get SZ info
const getSZInfo = async (req, res) => {
    try {
        const sz = await SZ.find();
        res.json(sz);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create or update SZ info
const updateSZInfo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, images } = req.body;
        const sz = await SZ.findByIdAndUpdate(id, { title, description, images }, { new: true, upsert: true });
        res.json(sz);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getSZInfo,
    updateSZInfo
};