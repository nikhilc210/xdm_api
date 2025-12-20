const express = require("express");
const router = express.Router();
const informativeController = require("../../controllers/Informative");

// GET
router.get("/", informativeController.getInformative);

// POST / PUT (depending on implementation choice)
router.post("/update", informativeController.updateInformative);

module.exports = router;
