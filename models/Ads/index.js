// /models/Ad.js
const mongoose = require("mongoose");
const { adLocations } = require("../../utils");

const adSchema = new mongoose.Schema(
  {
    advertiserName: { type: String, required: true },
    adLocation: { type: String, enum: adLocations, required: true },
    desktopImageUrl: { type: String, required: true },
    mobileImageUrl: { type: String, required: true },
    redirectUrl: { type: String, required: true },
    endDate: { type: Date, required: true },
    code: { type: String, required: true },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ad", adSchema);
