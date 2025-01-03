const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    age: { type: String },
    location: { type: String, required: true },
    occupation: { type: String, required: true },
    organization: { type: String },
    education: { type: String, required: true },
    experience: { type: String },
    subjects: { type: String, required: true },
    ageGroup: { type: String, required: true },
    certifications: { type: String },
    daysAvailable: { type: [String], required: true },
    timeSlots: { type: String },
    hoursPerWeek: { type: String, required: true },
    motivation: { type: String },
    impact: { type: String },
    otherNGOs: { type: String },
    laptopAccess: { type: String, required: true },
    preferences: { type: String },
    backgroundCheck: { type: String, required: true },
    acknowledgment: { type: Boolean, required: true }
}, { timestamps: true });

const Mentor = mongoose.model('Mentor', mentorSchema);

module.exports = Mentor;