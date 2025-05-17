const mongoose = require('mongoose');
const Home = require('../Models/homeModel');

const getHomeContent = async (req, res) => {
    try {
        const homeContent = await Home.findOne();
        if (!homeContent) {
            return res.status(404).json({ message: "No home content found" });
        }
        const response = homeContent.toObject();
        if (response.sliderImagesUpload && response.sliderImagesUpload.length > 0) {
            response.sliderImagesUpload = response.sliderImagesUpload.map(buffer => 
                `data:image/jpeg;base64,${buffer.toString('base64')}`
            );
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
};

const updateHomeContent = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: true, message: "Invalid ID format" });
        }
        const updatedContent = await Home.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedContent) {
            return res.status(404).json({ error: true, message: "Content not found" });
        }
        res.status(200).json(updatedContent);
    } catch (error) {
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
};

const uploadHomeImages = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: true, message: "Invalid ID format" });
        }

        // Log the received files for debugging
        console.log('Received files:', req.files);

        const updateData = {};

        // Handle sliderImagesUpload
        if (req.files.sliderImagesUpload) {
            console.log(`Processing ${req.files.sliderImagesUpload.length} slider images`);
            updateData.sliderImagesUpload = req.files.sliderImagesUpload.map(file => file.buffer);
        } else {
            console.log('No sliderImagesUpload files received');
        }

        // Handle story pointer images
        if (req.files.pointer1imageUpload) {
            updateData['story.pointer1image.imageUpload'] = req.files.pointer1imageUpload[0].buffer;
            console.log('Processed pointer1imageUpload');
        }
        if (req.files.pointer2imageUpload) {
            updateData['story.pointer2image.imageUpload'] = req.files.pointer2imageUpload[0].buffer;
            console.log('Processed pointer2imageUpload');
        }
        if (req.files.pointer3imageUpload) {
            updateData['story.pointer3image.imageUpload'] = req.files.pointer3imageUpload[0].buffer;
            console.log('Processed pointer3imageUpload');
        }
        if (req.files.pointer4imageUpload) {
            updateData['story.pointer4image.imageUpload'] = req.files.pointer4imageUpload[0].buffer;
            console.log('Processed pointer4imageUpload');
        }

        // Handle event images
        if (req.files.eventImagesUpload) {
            updateData.events = req.files.eventImagesUpload.map((file, index) => ({
                imageUpload: file.buffer,
                ...(req.body.events && req.body.events[index] ? req.body.events[index] : {})
            }));
            console.log('Processed eventImagesUpload');
        }

        // Handle main event images
        if (req.files.mainEventImagesUpload) {
            updateData.mainevent = req.files.mainEventImagesUpload.map((file, index) => ({
                imageUpload: file.buffer,
                ...(req.body.mainevent && req.body.mainevent[index] ? req.body.mainevent[index] : {})
            }));
            console.log('Processed mainEventImagesUpload');
        }

        // Handle newSliderImage
        if (req.files.newSliderImageUpload) {
            updateData['newSliderImage.imageUpload'] = req.files.newSliderImageUpload[0].buffer;
            console.log('Processed newSliderImageUpload');
        }

        // Handle ourImpact image
        if (req.files.ourImpactImageUpload) {
            updateData['ourImpact.imageUpload'] = req.files.ourImpactImageUpload[0].buffer;
            console.log('Processed ourImpactImageUpload');
        }

        // If no updates, return early
        if (Object.keys(updateData).length === 0) {
            console.log('No image data to update');
            return res.status(400).json({ error: true, message: "No image files received" });
        }

        const updatedContent = await Home.findByIdAndUpdate(
            req.params.id,
            { $set: updateData },
            { new: true }
        );

        if (!updatedContent) {
            return res.status(404).json({ error: true, message: "Content not found" });
        }

        console.log('Successfully updated Home document with images');
        res.status(200).json(updatedContent);
    } catch (error) {
        console.error('Error in uploadHomeImages:', error.message);
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
};

module.exports = { getHomeContent, updateHomeContent, uploadHomeImages };