const News = require('../Models/newsModel');

// Get all news
const getNews = async (req, res) => {
    try {
        const news = await News.find();
        res.json(news);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create or update news
const updateNews = async (req, res) => {
    try {
        const { id } = req.params;
        const { image, heading, description, buttonText, articleUrl } = req.body;
        const news = await News.findByIdAndUpdate(id, { image, heading, description, buttonText, articleUrl }, { new: true, upsert: true });
        res.json(news);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getNews,
    updateNews
};