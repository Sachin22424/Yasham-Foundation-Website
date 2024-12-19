const express = require('express');
const { registerUser, authUser, updatePassword, getAllUsers } = require('../Controllers/userController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/update-password', updatePassword);
router.get('/users', getAllUsers);  // New route to fetch all users

module.exports = router;
