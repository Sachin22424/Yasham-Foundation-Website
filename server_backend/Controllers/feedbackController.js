const Feedback = require('../Models/feedbackModel.js');
const nodemailer = require('nodemailer');
const exceljs = require('exceljs');

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

        res.status(201).json({ message: 'Feedback submitted successfully!', feedback });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Export feedbacks to Excel
const exportFeedbacksToExcel = async (req, res) => {
    try {
        const feedbacks = await Feedback.find();

        const workbook = new exceljs.Workbook();
        const worksheet = workbook.addWorksheet('Feedbacks');

        worksheet.columns = [
            { header: 'Name', key: 'name', width: 30 },
            { header: 'Email', key: 'email', width: 30 },
            { header: 'Subject', key: 'subject', width: 30 },
            { header: 'Message', key: 'message', width: 50 },
            { header: 'Date', key: 'createdAt', width: 20 }
        ];

        feedbacks.forEach(feedback => {
            worksheet.addRow({
                name: feedback.name,
                email: feedback.email,
                subject: feedback.subject,
                message: feedback.message,
                createdAt: feedback.createdAt.toLocaleString()
            });
        });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=feedbacks.xlsx');

        await workbook.xlsx.write(res);
        res.end();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createFeedback,
    getFeedbacks,
    deleteAllFeedbacks,
    exportFeedbacksToExcel
};