// /routes/adRoutes.js
const express = require("express");
const router = express.Router();
const adController = require("../../controllers/Ads");

router.post("/", adController.createAd);
router.get("/", adController.getAllAds);
router.get("/:id", adController.getAd);
router.put("/:id", adController.updateAd);
router.delete("/:id", adController.deleteAd);

module.exports = router;
