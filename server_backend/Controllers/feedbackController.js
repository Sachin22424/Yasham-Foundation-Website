const Feedback = require('../Models/feedbackModel.js');
const nodemailer = require('nodemailer');
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

// Get all feedbacks
const getFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.find();
        res.json(feedbacks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete all feedbacks
const deleteAllFeedbacks = async (req, res) => {
    try {
        await Feedback.deleteMany();
        res.status(200).json({ message: 'All feedbacks deleted successfully!' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create new feedback
const createFeedback = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Create and save the new feedback
        const feedback = new Feedback({
            name,
            email,
            subject,
            message
        });

        await feedback.save();

        // Send an email with the feedback details
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
            subject: 'New Feedback Submitted',
            text: `You have received new feedback:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`
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
        const filePath = path.join(__dirname, '../feedbacks1.xlsx');

        // Check if the Excel file already exists
        let workbook;
        if (fs.existsSync(filePath)) {
            workbook = xlsx.readFile(filePath);
        } else {
            workbook = xlsx.utils.book_new();
            const worksheet = xlsx.utils.json_to_sheet([]);
            xlsx.utils.book_append_sheet(workbook, worksheet, 'Feedbacks');
        }

        // Add the new feedback to the Excel sheet
        const worksheet = workbook.Sheets['Feedbacks'];
        const feedbackData = xlsx.utils.sheet_to_json(worksheet);
        feedbackData.push({
            Name: name,
            Email: email,
            Subject: subject,
            Message: message,
            Date: new Date().toLocaleString()
        });

        // Convert JSON data to worksheet
        const newWorksheet = xlsx.utils.json_to_sheet(feedbackData);

        // Replace the old worksheet with the new one
        workbook.Sheets['Feedbacks'] = newWorksheet;

        // Write the updated workbook to the Excel file
        xlsx.writeFile(workbook, filePath);

        res.status(201).json({ message: 'Feedback submitted successfully!', feedback });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createFeedback,
    getFeedbacks,
    deleteAllFeedbacks
};