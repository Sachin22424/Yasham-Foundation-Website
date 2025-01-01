const SEM = require('../Models/semModel');

// Get SEM info
const getSEMInfo = async (req, res) => {
    try {
        const sem = await SEM.find();
        res.json(sem);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create or update SEM info
const updateSEMInfo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, images } = req.body;
        const sem = await SEM.findByIdAndUpdate(id, { title, description, images }, { new: true, upsert: true });
        res.json(sem);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getSEMInfo,
    updateSEMInfo
};