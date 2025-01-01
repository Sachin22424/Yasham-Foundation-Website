const express = require('express');
const router = express.Router();
const { getNews, updateNews } = require('../Controllers/newController');

// Route to get all news
router.get('/', getNews);

// Route to update news by ID
router.put('/:id', updateNews);

module.exports = router;