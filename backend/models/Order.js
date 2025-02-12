import sequelize from "../config/db.js";
import { DataTypes, Sequelize } from "sequelize";
import Customer from "./Customer.js";
import OrderStatus from "./OrderStatus.js";
import OrderItem from "./OrderItem.js";

const Order = sequelize.define("order", {
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  orderTotal: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  orderDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP(3)"),
  },
  orderStatus: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deliveryAddress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  orderType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  billUrl: {
    type: DataTypes.STRING,
  },
});

Order.hasMany(OrderItem, { foreignKey: "orderId" });
OrderItem.belongsTo(Order, { foreignKey: "orderId" });
Order.belongsTo(Customer, { foreignKey: "customerId" });
Order.hasOne(OrderStatus, { foreignKey: "orderId" });

Order.sync()
  .then(() => {
    console.log("Order table synced successfully!");
  })
  .catch((error) => {
    throw new Error("Error syncing Order table: " + error.message);
  });

export default Order;
