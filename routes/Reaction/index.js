// routes/reactions.js
const express = require("express");
const router = express.Router();
const Reaction = require("../../models/Reaction");

// GET: Get counts for a newsId
router.get("/:newsId", async (req, res) => {
  const { newsId } = req.params;

  let reaction = await Reaction.findOne({ newsId });
  if (!reaction) {
    reaction = new Reaction({ newsId });
    await reaction.save();
  }

  res.json(reaction.counts);
});

// POST: Add a reaction to a newsId
router.post("/:newsId", async (req, res) => {
  const { newsId } = req.params;
  const { type } = req.body;

  const validTypes = ["Happy", "Love", "Funny", "Sad", "Angry", "Like"];
  if (!validTypes.includes(type)) {
    return res.status(400).json({ error: "Invalid reaction type" });
  }

  let reaction = await Reaction.findOne({ newsId });
  if (!reaction) {
    reaction = new Reaction({ newsId });
  }

  reaction.counts[type]++;
  await reaction.save();

  res.json(reaction.counts);
});

module.exports = router;
