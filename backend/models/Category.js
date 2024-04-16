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
    unique: true, // Ensure category names are unique
  },
});

// Synchronize the model with the database
Category.sync()
  .then(() => {
    console.log("Category Table synced successfully!");
  })
  .catch(() => {
    console.log("Category Table is not synced!");
  });


export default Category;
