const express = require('express');
const { getHomeContent, updateHomeContent } = require('../Controllers/homeController');

const router = express.Router();

router.get('/', getHomeContent); // Get home content
router.put('/:id', updateHomeContent); // Update home content

module.exports = router;