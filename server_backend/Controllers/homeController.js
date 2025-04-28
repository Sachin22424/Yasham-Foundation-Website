const Home = require('../Models/homeModel');

const getHomeContent = async (req, res) => {
    try {
        const homeContent = await Home.findOne();
        if (!homeContent) {
            return res.status(404).json({ message: "No home content found" });
        }
        res.status(200).json(homeContent);
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

module.exports = { getHomeContent, updateHomeContent };