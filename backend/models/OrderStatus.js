import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const OrderStatus = sequelize.define("order_status", {
  orderId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  prepared: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  picked: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  delivered: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

OrderStatus.sync()
  .then(() => {
    console.log("Order Status table synced successfully!");
  })
  .catch((error) => {
    throw new Error("Error syncing Order table: " + error.message);
  });

export default OrderStatus;
