const express = require('express');
const multer = require('multer');
const { getHomeContent, updateHomeContent, uploadHomeImages } = require('../Controllers/homeController');

const router = express.Router();

// Multer configuration for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/', getHomeContent); // Get home content
router.put('/:id', updateHomeContent); // Update home content
router.post('/upload-images/:id', upload.fields([
    { name: 'sliderImagesUpload', maxCount: 10 },
    { name: 'pointer1imageUpload', maxCount: 1 },
    { name: 'pointer2imageUpload', maxCount: 1 },
    { name: 'pointer3imageUpload', maxCount: 1 },
    { name: 'pointer4imageUpload', maxCount: 1 },
    { name: 'eventImagesUpload', maxCount: 10 },
    { name: 'mainEventImagesUpload', maxCount: 10 },
    { name: 'newSliderImageUpload', maxCount: 1 },
    { name: 'ourImpactImageUpload', maxCount: 1 }
]), uploadHomeImages); // Upload images

module.exports = router;