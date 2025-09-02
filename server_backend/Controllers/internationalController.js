// controllers/internationalController.js
const International = require("../Models/internationalModel");

// Get ALL International programs
const getInternationalInfo = async (req, res) => {
  try {
    const international = await International.find();
    res.json(international);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get ONE International program by ID
const getInternationalById = async (req, res) => {
  try {
    const { id } = req.params;
    const international = await International.findById(id);

    if (!international) {
      return res.status(404).json({ message: "Program not found" });
    }

    res.json(international);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update ONE International program
const updateInternationalInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, images } = req.body;

    const updatedInternational = await International.findByIdAndUpdate(
      id,
      { title, description, images },
      { new: true, runValidators: true }
    );

    if (!updatedInternational) {
      return res.status(404).json({ message: "Program not found" });
    }

    res.json(updatedInternational);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getInternationalInfo,
  getInternationalById,
  updateInternationalInfo,
};
