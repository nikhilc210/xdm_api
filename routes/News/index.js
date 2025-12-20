const express = require("express");
const router = express.Router();
const newsController = require("../../controllers/News");

router.post("/publish", newsController.publishNews);
router.get("/featured", newsController.getFeatured);
router.get("/home", newsController.getHomeNews);
router.get("/list", newsController.getNewsList);
router.get("/editors-pick", newsController.getEditorsPick);
router.get("/trending", newsController.getTrending);
router.get("/politics", newsController.getPolitics);
router.get("/videos", newsController.getVideos);
router.get("/world", newsController.getWorldNews);
router.get("/category", newsController.getCategoryNews);
router.get("/", newsController.getAllNews);
router.delete("/:id", newsController.deleteNews);
router.put("/:id", newsController.updateNews);
router.get("/detail/:id", newsController.getNewsDetail);

module.exports = router;
