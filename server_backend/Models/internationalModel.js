// models/internationalModel.js
const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  caption: { type: String, default: "" },
});

const internationalSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    images: [imageSchema], // optional, only some docs have images
  },
  { timestamps: true }
);

const International =
  mongoose.models.International ||
  mongoose.model("International", internationalSchema);

module.exports = International;
