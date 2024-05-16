import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
import Item from "./Item.js";

const OrderItem = sequelize.define("order_item", {
  orderItemId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  itemId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

OrderItem.belongsTo(Item, { foreignKey: "itemId" });

OrderItem.sync()
  .then(() => {
    console.log("Order Item table synced successfully!");
  })
  .catch((error) => {
    throw new Error("Error syncing Order table: " + error.message);
  });

export default OrderItem;
