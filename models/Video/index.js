const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  code: { type: String, required: true },
  contentType: { type: String, required: true },
  category: { type: String },
  section: { type: String },
  headline: { type: String },
  videoTitle: { type: String },
  youtubeVideoId: { type: String },
  content: { type: String },
  source: { type: String },
  newsImageUrl: { type: String },
  deleted: { type: Boolean, default: false }, // ← add this
  publishedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Video", newsSchema);
