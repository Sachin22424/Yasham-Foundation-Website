const Contact = require('../Models/contactModel');

// Get contact info
const getContactInfo = async (req, res) => {
    try {
        const contact = await Contact.findOne();
        res.json(contact);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update contact info
const updateContactInfo = async (req, res) => {
    try {
        const { id } = req.params;
        const { mail, number, linkedin, facebook, instagram, feedbacktitle, feedbackmessage, getInTouchHeading, followUsHeading } = req.body;
        const contact = await Contact.findByIdAndUpdate(id, { mail, number, linkedin, facebook, instagram, feedbacktitle, feedbackmessage, getInTouchHeading, followUsHeading }, { new: true, upsert: true });
        res.json(contact);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getContactInfo,
    updateContactInfo
};