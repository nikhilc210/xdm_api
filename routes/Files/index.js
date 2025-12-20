const express = require("express");
const router = express.Router();
const upload = require("../../config/multer");
const { uploadImage } = require("../../controllers/Files");

router.post("/upload-image", upload.single("image"), uploadImage);

module.exports = router;
