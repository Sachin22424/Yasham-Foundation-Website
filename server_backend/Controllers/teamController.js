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