const express = require("express");
const router = express.Router();
const categoryController = require("../../controllers/Category");

// GET /api/categories
router.get("/", categoryController.getAllCategories);

// POST /api/categories
router.post("/", categoryController.createCategory);

//PUT /api/categories
router.put("/:id", categoryController.updateCategory);

// DELETE (soft delete) category by id
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
