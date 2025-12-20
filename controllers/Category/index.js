const Category = require("../../models/Category");

// GET all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({ deleted: false });

    res.json({ status: "success", category: categories });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// POST create a category
exports.createCategory = async (req, res) => {
  const { name, active } = req.body;
  let code = "CC" + Math.floor(10000 + Math.random() * 90000);
  try {
    // Check if category already exists (case insensitive)
    const existingCategory = await Category.findOne({
      name: { $regex: new RegExp("^" + name + "$", "i") },
    });

    if (existingCategory) {
      return res
        .status(400)
        .json({ status: "error", message: "Category already exists" });
    }

    const newCategory = new Category({
      code,
      name,
      active,
    });

    const savedCategory = await newCategory.save();
    res.status(201).json({ status: "success", savedCategory });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
// UPDATE category by id
exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, active } = req.body;

  try {
    const category = await Category.findById(id);

    if (!category) {
      return res
        .status(404)
        .json({ status: "success", message: "Category not found" });
    }

    // Check if new name conflicts with existing category (except itself)
    if (name) {
      const existingCategory = await Category.findOne({
        _id: { $ne: id },
        name: { $regex: new RegExp("^" + name + "$", "i") },
      });

      if (existingCategory) {
        return res
          .status(400)
          .json({ status: "error", message: "Category name already exists" });
      }

      category.name = name;
    }

    if (active !== undefined) {
      category.active = active;
    }

    const updatedCategory = await category.save();
    res.json({ status: "success", updatedCategory });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// SOFT DELETE category by id
exports.deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id);

    if (!category) {
      return res
        .status(404)
        .json({ status: "error", message: "Category not found" });
    }

    category.deleted = true;
    await category.save();

    res.json({ status: "success", message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};
