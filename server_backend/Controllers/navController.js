const Nav = require('../Models/navModel');

// Get navbar info
const getNavInfo = async (req, res) => {
    try {
        const nav = await Nav.findOne();
        res.json(nav);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update navbar info
const updateNavInfo = async (req, res) => {
    try {
        const { id } = req.params;
        const { heading, dropdowns } = req.body;
        const nav = await Nav.findByIdAndUpdate(id, { heading, dropdowns }, { new: true, upsert: true });
        res.json(nav);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getNavInfo,
    updateNavInfo
};