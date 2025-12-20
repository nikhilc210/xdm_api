// models/Reaction.js
const mongoose = require("mongoose");

const reactionSchema = new mongoose.Schema({
  newsId: { type: String, required: true, unique: true },
  counts: {
    Happy: { type: Number, default: 0 },
    Love: { type: Number, default: 0 },
    Funny: { type: Number, default: 0 },
    Sad: { type: Number, default: 0 },
    Angry: { type: Number, default: 0 },
    Like: { type: Number, default: 0 },
  },
});

module.exports = mongoose.model("Reaction", reactionSchema);
