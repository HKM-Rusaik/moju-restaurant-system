import Category from "../../models/Category.js";

export const createCategory = async (req, res) => {
  const { categoryName } = req.body;

  try {
    const newCategory = await Category.create({
      categoryName: categoryName,
    });
    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error creating category: ", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getCategory = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error in fetching categories", error);
    res.status(500).json({
      error: "Server error",
    });
  }
};

export const updateCategory = async (req, res) => {
  const categoryId = req.params.id;
  const { categoryName } = req.body;

  try {
    const updatedCategory = await Category.update(
      { categoryName: categoryName },
      { where: { categoryId: categoryId } }
    );
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error("Error updating category: ", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteCategory = async (req, res) => {
  const categoryId = req.params.id;

  try {
    await Category.destroy({
      where: { categoryId: categoryId },
    });
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category: ", error);
    res.status(500).json({ error: "Server error" });
  }
};
