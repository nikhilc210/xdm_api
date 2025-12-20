const mongoose = require("mongoose");

const informativeSchema = new mongoose.Schema(
  {
    career: { type: String },
    terms: { type: String },
    privacy: { type: String },
    spotify: { type: String },
    about: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Informative", informativeSchema);
