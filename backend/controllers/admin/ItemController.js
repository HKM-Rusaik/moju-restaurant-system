import Item from "../../models/Item.js";
import Category from "../../models/category.js";

export const createItem = async (req, res) => {
  const { itemName, itemPrice, itemPicURL, itemStatus, categoryId } = req.body;

  try {
    const countItem = await Item.count({ where: { itemName: itemName } });

    if (countItem > 0) {
      return res.send("Item already exists!");
    }

    const newItem = await Item.create({
      itemName: itemName,
      itemPrice: itemPrice,
      itemPicURL: itemPicURL,
      itemStatus: itemStatus,
      categoryId: categoryId,
    });

    res.status(201).json(newItem);
  } catch (error) {
    console.error("Error creating new item:", error);
    res.status(500).json({ error: "Server error while creating new item" });
  }
};

export const getItem = async (req, res) => {
  try {
    const items = await Item.findAll({
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["categoryName"],
        },
      ],
      order: [["itemId", "ASC"]],
    });

    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching items with categories:", error);
    res.status(500).json({ error: "Error fetching items with categories" });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const itemToDelete = await Item.findByPk(itemId);

    if (!itemToDelete) {
      return res.status(404).json({ error: "Item not found" });
    }

    await itemToDelete.destroy();
    return res.status(200).json({ message: "Item Deleted Sucessfully!" });
  } catch (error) {
    console.error("Error deleting item: ", error);
    res.status(500).json({ error: "Error deleting item" });
  }
};

//new one has to be checked carefully
export const updateItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const { itemName, itemPrice, itemPicURL, itemStatus, categoryId } =
      req.body;

    const itemToUpdate = await Item.findByPk(itemId);

    if (!itemToUpdate) {
      return res.status(404).json({ error: "Item not found" });
    }

    // Update the item with the new values
    await itemToUpdate.update({
      itemName: itemName,
      itemPrice: itemPrice,
      itemPicURL: itemPicURL,
      itemStatus: itemStatus,
      categoryId: categoryId,
    });

    return res.status(200).json({ message: "Item Updated Successfully!" });
  } catch (error) {
    console.error("Error updating item: ", error);
    res.status(500).json({ error: "Error updating item" });
  }
};
