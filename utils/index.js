const jwt = require("jsonwebtoken");

const generateAlphanumericCode = (length) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
};

const adLocations = [
  "HEADER_LEADERBOARD",
  "TOP_STORIES_MIDDLE_RECTANGLE",
  "TOP_STORIES_BOTTOM_LEADERBOARD",
  "EDITORS_PICK_TOP_RECTANGLE",
  "EDITORS_PICK_MIDDLE_RECTANGLE",
  "EDITORS_PICK_BOTTOM_LEADERBOARD",
  "TRENDING_NEWS_TOP_RECTANGLE",
  "TRENDING_NEWS_MIDDLE_RECTANGLE",
  "TRENDING_NEWS_BOTTOM_LEADERBOARD",
  "POLITICS_TOP_RECTANGLE",
  "POLITICS_MIDDLE_RECTANGLE",
  "POLITICS_BOTTOM_LEADERBOARD",
  "NEWS_CATEGORY_TOP_RECTANGLE",
  "NEWS_CATEGORY_MIDDLE_RECTANGLE",
  "NEWS_CATEGORY_BOTTOM_LEADERBOARD",
  "NEWS_DETAIL_TOP_LEADERBOARD",
  "NEWS_DETAIL_MIDDLE_RECTANGLE",
  "NEWS_DETAIL_BOTTOM_RECTANGLE",
];

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = { generateAlphanumericCode, adLocations, generateToken };
