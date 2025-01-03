const Mentor = require('../Models/mentorModel.js');
const nodemailer = require('nodemailer');
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

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

        // Path to the Excel file
        const filePath = path.join(__dirname, '../mentors.xlsx');

        // Check if the Excel file already exists
        let workbook;
        if (fs.existsSync(filePath)) {
            workbook = xlsx.readFile(filePath);
        } else {
            workbook = xlsx.utils.book_new();
            const worksheet = xlsx.utils.json_to_sheet([]);
            xlsx.utils.book_append_sheet(workbook, worksheet, 'Mentors');
        }

        // Add the new mentor application to the Excel sheet
        const worksheet = workbook.Sheets['Mentors'];
        const mentorDataArray = xlsx.utils.sheet_to_json(worksheet);
        mentorDataArray.push({
            ...mentorData,
            Date: new Date().toLocaleString()
        });

        // Convert JSON data to worksheet
        const newWorksheet = xlsx.utils.json_to_sheet(mentorDataArray);

        // Replace the old worksheet with the new one
        workbook.Sheets['Mentors'] = newWorksheet;

        // Write the updated workbook to the Excel file
        xlsx.writeFile(workbook, filePath);

        res.status(201).json({ message: 'Mentor application submitted successfully!', mentor });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createMentor,
    getMentors,
    deleteAllMentors
};