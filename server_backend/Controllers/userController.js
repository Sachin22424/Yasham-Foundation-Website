const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

exports.registerUser = async (req, res) => {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ email, password });

    if (user) {
        res.status(201).json({
            _id: user._id,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};

exports.authUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password...' });
    }
};


exports.updatePassword = async (req, res) => {
    const { email, newPassword } = req.body;

    const user = await User.findOne({ email });

    if (user) {
        user.password = newPassword;
        await user.save();
        res.json({ message: 'Password updated successfully' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();  // Fetch all users from the database
        res.json(users);  // Respond with the list of users
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
