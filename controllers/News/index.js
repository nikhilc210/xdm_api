const News = require("../../models/News");
const { generateAlphanumericCode } = require("../../utils");

// Publish news
exports.publishNews = async (req, res) => {
  try {
    const code = generateAlphanumericCode(10);
    const news = new News({
      ...req.body,
      code: code, // ← add generated code here
    });
    const savedNews = await news.save();
    res.status(201).json({
      status: "success",
      message: "News published successfully",
      data: savedNews,
    });
  } catch (err) {
    res.status(400).json({ status: "success", message: err.message });
  }
};

// Get all news
exports.getAllNews = async (req, res) => {
  try {
    const news = await News.find({ deleted: false }).sort({ publishedAt: -1 }); // ← exclude soft-deleted
    res.status(200).json(news);
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

//Delete News
exports.deleteNews = async (req, res) => {
  try {
    const newsId = req.params.id;

    const deletedNews = await News.findByIdAndUpdate(
      newsId,
      { deleted: true },
      { new: true }
    );

    if (!deletedNews) {
      return res
        .status(404)
        .json({ status: "error", message: "News not found" });
    }

    res.status(200).json({
      status: "success",
      message: "News deleted (soft delete)",
      data: deletedNews,
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

//Update News
exports.updateNews = async (req, res) => {
  try {
    const newsId = req.params.id;

    const updatedNews = await News.findByIdAndUpdate(
      newsId,
      req.body,
      { new: true } // returns the updated document
    );

    if (!updatedNews) {
      return res
        .status(404)
        .json({ status: "error", message: "News not found" });
    }

    res.status(200).json({
      status: "success",
      message: "News updated successfully",
      data: updatedNews,
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.getNewsDetail = async (req, res) => {
  try {
    const newsId = req.params.id;
    const news = await News.find({ _id: newsId });
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.getFeatured = async (req, res) => {
  const data = await News.find({
    deleted: false,
    section: "Top Stories",
    contentType: "News",
  })
    .sort({ publishedAt: -1 })
    .limit(1);

  res.json(data);
};

exports.getHomeNews = async (req, res) => {
  const data = await News.find({
    deleted: false,
    contentType: "News",
  })
    .sort({ publishedAt: -1 })
    .limit(8);

  res.json(data);
};

exports.getNewsList = async (req, res) => {
  const data = await News.find(
    { deleted: false, contentType: "News" },
    {
      headline: 1,
      newsImageUrl: 1,
      category: 1,
      publishedAt: 1,
    }
  )
    .sort({ publishedAt: -1 })
    .limit(20);

  res.json(data);
};
exports.getEditorsPick = async (req, res) => {
  const data = await News.find({
    deleted: false,
    section: "Diaspora Voices",
    contentType: "News",
  })
    .sort({ publishedAt: -1 })
    .limit(20);

  res.json(data);
};
exports.getTrending = async (req, res) => {
  const data = await News.find({
    deleted: false,
    section: "Immigration News",
    contentType: "News",
  })
    .sort({ publishedAt: -1 })
    .limit(20);

  res.json(data);
};
exports.getPolitics = async (req, res) => {
  const data = await News.find({
    deleted: false,
    section: "Visa & Travel Guides",
    contentType: "News",
  })
    .sort({ publishedAt: -1 })
    .limit(20);

  res.json(data);
};
exports.getVideos = async (req, res) => {
  const data = await News.find({
    deleted: false,
    contentType: "Video",
  })
    .sort({ publishedAt: -1 })
    .limit(6);

  res.json(data);
};

exports.getWorldNews = async (req, res) => {
  const data = await News.find({
    deleted: false,
    section: "World News",
    contentType: "News",
  })
    .sort({ publishedAt: -1 })
    .limit(24);

  res.json(data);
};

exports.getCategoryNews = async (req, res) => {
  try {
    const {
      category,
      section,
      contentType = "News",
      page = 1,
      limit = 12,
    } = req.query;

    const query = {
      deleted: false,
      contentType,
    };

    if (category) query.category = category;
    if (section) query.section = section;

    const skip = (page - 1) * limit;

    const data = await News.find(query)
      .sort({ publishedAt: -1 })
      .skip(Number(skip))
      .limit(Number(limit));

    const total = await News.countDocuments(query);

    res.json({
      success: true,
      page: Number(page),
      limit: Number(limit),
      total,
      hasMore: skip + data.length < total,
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
