const express = require('express');
const { registerUser, authUser, updatePassword, getAllUsers, deleteAllUsers } = require('../Controllers/userController');
const { protect } = require('../Middelware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/update-password', protect, updatePassword);
router.get('/users', protect, getAllUsers);  // New route to fetch all users
router.delete('/users', protect, deleteAllUsers);  // New route to delete all users

module.exports = router;