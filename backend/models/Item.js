import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Category from "./category.js";
import OrderItem from "./OrderItem.js";

const Item = sequelize.define("item", {
  itemId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  itemName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  itemDescription: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  itemPrice: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  itemPicURL: {
    type: DataTypes.STRING,
  },
  itemStatus: {
    type: DataTypes.BOOLEAN,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Item.belongsTo(Category, { foreignKey: "categoryId" });
// Item.hasMany(OrderItem, { foreignKey: "itemId" });

// Item.sync()
//   .then(() => {
//     console.log("Item Table synced successfully!");
//   })
//   .catch(() => {
//     console.log("Item Table is not synced!");
//   });

export default Item;
