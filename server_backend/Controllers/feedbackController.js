const Feedback = require('../Models/feedbackModel.js');
const nodemailer = require('nodemailer');
const xlsx = require('xlsx');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Create new feedback
const createFeedback = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Validate fields
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

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

        // Download the Excel file
        const excelURL = 'https://1drv.ms/x/s!ApM_8vgfu4FdmsEk00ruHDuXBjqH6w?e=lAdjgC';
        const excelPath = path.join(__dirname, '../temp_feedbacks.xlsx');
        const response = await axios({ url: excelURL, method: 'GET', responseType: 'arraybuffer' });
        fs.writeFileSync(excelPath, response.data);

        // Read and update the Excel sheet
        const workbook = xlsx.readFile(excelPath);
        const sheetName = workbook.SheetNames[0]; // Assuming the first sheet is the target
        const worksheet = workbook.Sheets[sheetName];

        const feedbackData = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

        // Append the new feedback row
        const newRow = [name, email, subject, message, new Date().toLocaleString()];
        feedbackData.push(newRow);

        // Convert updated data back to worksheet
        const newWorksheet = xlsx.utils.aoa_to_sheet(feedbackData);
        workbook.Sheets[sheetName] = newWorksheet;

        // Write updated Excel file
        xlsx.writeFile(workbook, excelPath);

        res.status(201).json({ message: 'Feedback submitted successfully!', feedback });
    } catch (err) {
        console.error('Error processing feedback:', err);
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createFeedback
};
