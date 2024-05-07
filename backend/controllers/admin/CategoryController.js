import Category from "../../models/category.js"; // Assuming your model file is named models.js or similar

// Create a new category
export const createCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;
    const category = await Category.create({ categoryName });
    return res.status(201).json(category);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Edit a category
export const editCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { categoryName } = req.body;

    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    category.categoryName = categoryName;
    await category.save();

    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a category
export const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    // Find the category by ID
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Delete the category
    await category.destroy();

    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
