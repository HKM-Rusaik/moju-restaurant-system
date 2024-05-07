import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Category = sequelize.define("category", {
  categoryId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  categoryName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, 
  },
});

// Sync the Category table and return the promise
const syncCategoryTable = async () => {
  try {
    await Category.sync();
    console.log("Category Table synced successfully!");
  } catch (error) {
    console.error("Error syncing Category Table:", error);
    throw error; // Re-throw the error for handling in the calling code
  }
};

export default Category;
export { syncCategoryTable };
