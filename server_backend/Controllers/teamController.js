const Team = require('../Models/teamModel');

exports.getAllMembers = async (req, res) => {
    try {
        const members = await Team.find();
        res.json(members);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createMember = async (req, res) => {
    const member = new Team(req.body);
    try {
        const newMember = await member.save();
        res.status(201).json(newMember);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateMember = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedMember = await Team.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedMember);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteMember = async (req, res) => {
    try {
        const { id } = req.params;
        await Team.findByIdAndDelete(id);
        res.json({ message: 'Member deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateAllMembers = async (req, res) => {
    try {
        // Delete all existing members
        await Team.deleteMany({});

        // Insert new members
        const updatedMembers = await Team.insertMany(req.body);

        res.json(updatedMembers);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};