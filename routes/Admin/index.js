const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/Admin");
const { verifyAdminToken } = require("../../middleware");

// POST create administrator
router.post("/", adminController.createAdmin);
// PUT update administrator
router.put("/:id", adminController.updateAdmin);
// GET all admins
router.get("/", adminController.getAllAdmins);

router.get("/:id", verifyAdminToken, adminController.getAdminDetail);

module.exports = router;
