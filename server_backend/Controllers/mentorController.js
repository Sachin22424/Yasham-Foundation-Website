const Mentor = require('../Models/mentorModel.js');
const nodemailer = require('nodemailer');
const exceljs = require('exceljs');

// Get all mentor applications
const getMentors = async (req, res) => {
    try {
        const mentors = await Mentor.find();
        res.json(mentors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete all mentor applications
const deleteAllMentors = async (req, res) => {
    try {
        await Mentor.deleteMany();
        res.status(200).json({ message: 'All mentor applications deleted successfully!' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create new mentor application
const createMentor = async (req, res) => {
    try {
        const mentorData = req.body;

        // Create and save the new mentor application
        const mentor = new Mentor(mentorData);
        await mentor.save();

        // Send an email with the mentor application details
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Send to yourself
            subject: 'New Mentor Application Submitted',
            text: `You have received a new mentor application:\n\n${JSON.stringify(mentorData, null, 2)}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ message: 'Failed to send email' });
            } else {
                console.log('Email sent:', info.response);
            }
        });

        res.status(201).json({ message: 'Mentor application submitted successfully!', mentor });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Export mentor applications to Excel
const exportMentorsToExcel = async (req, res) => {
    try {
        const mentors = await Mentor.find();

        const workbook = new exceljs.Workbook();
        const worksheet = workbook.addWorksheet('Mentors');

        worksheet.columns = [
            { header: 'Full Name', key: 'fullName', width: 30 },
            { header: 'Email', key: 'email', width: 30 },
            { header: 'Phone', key: 'phone', width: 20 },
            { header: 'Age', key: 'age', width: 10 },
            { header: 'Location', key: 'location', width: 20 },
            { header: 'Occupation', key: 'occupation', width: 20 },
            { header: 'Organization', key: 'organization', width: 20 },
            { header: 'Education', key: 'education', width: 20 },
            { header: 'Experience', key: 'experience', width: 30 },
            { header: 'Subjects', key: 'subjects', width: 20 },
            { header: 'Age Group', key: 'ageGroup', width: 20 },
            { header: 'Certifications', key: 'certifications', width: 30 },
            { header: 'Days Available', key: 'daysAvailable', width: 30 },
            { header: 'Time Slots', key: 'timeSlots', width: 20 },
            { header: 'Hours Per Week', key: 'hoursPerWeek', width: 20 },
            { header: 'Motivation', key: 'motivation', width: 30 },
            { header: 'Impact', key: 'impact', width: 30 },
            { header: 'Other NGOs', key: 'otherNGOs', width: 30 },
            { header: 'Laptop Access', key: 'laptopAccess', width: 20 },
            { header: 'Preferences', key: 'preferences', width: 30 },
            { header: 'Background Check', key: 'backgroundCheck', width: 20 },
            { header: 'Acknowledgment', key: 'acknowledgment', width: 20 },
            { header: 'Date', key: 'createdAt', width: 20 }
        ];

        mentors.forEach(mentor => {
            worksheet.addRow({
                fullName: mentor.fullName,
                email: mentor.email,
                phone: mentor.phone,
                age: mentor.age,
                location: mentor.location,
                occupation: mentor.occupation,
                organization: mentor.organization,
                education: mentor.education,
                experience: mentor.experience,
                subjects: mentor.subjects,
                ageGroup: mentor.ageGroup,
                certifications: mentor.certifications,
                daysAvailable: mentor.daysAvailable.join(', '),
                timeSlots: mentor.timeSlots,
                hoursPerWeek: mentor.hoursPerWeek,
                motivation: mentor.motivation,
                impact: mentor.impact,
                otherNGOs: mentor.otherNGOs,
                laptopAccess: mentor.laptopAccess,
                preferences: mentor.preferences,
                backgroundCheck: mentor.backgroundCheck,
                acknowledgment: mentor.acknowledgment,
                createdAt: mentor.createdAt.toLocaleString()
            });
        });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=mentors.xlsx');

        await workbook.xlsx.write(res);
        res.end();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createMentor,
    getMentors,
    deleteAllMentors,
    exportMentorsToExcel
};