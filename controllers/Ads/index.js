// /controllers/adController.js

const Ad = require("../../models/Ads");
const { generateAlphanumericCode } = require("../../utils");

// Create Ad
exports.createAd = async (req, res) => {
  try {
    const code = generateAlphanumericCode(10);
    const ad = new Ad({ ...req.body, code });
    const savedAd = await ad.save();
    res.status(201).json({ status: "success", data: savedAd });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

// Get All Ads
exports.getAllAds = async (req, res) => {
  try {
    const ads = await Ad.find({ deleted: false });
    res.status(200).json({ status: "success", data: ads });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// Get Single Ad
exports.getAd = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) return res.status(404).json({ message: "Ad not found" });
    res.status(200).json({ status: "success", data: ad });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// Update Ad
exports.updateAd = async (req, res) => {
  try {
    const updatedAd = await Ad.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedAd) return res.status(404).json({ message: "Ad not found" });
    res.status(200).json({ status: "success", data: updatedAd });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// Soft Delete Ad
exports.deleteAd = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) return res.status(404).json({ message: "Ad not found" });
    ad.deleted = true;
    await ad.save();
    res
      .status(200)
      .json({ status: "success", message: "Ad marked as deleted" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};
