import sequelize from "../config/db";
import { DataTypes } from "sequelize";
import Customer from "./Customer";

const Order = sequelize.deffine("order", {
  OrderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  OrderTotal: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  OrderDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
  },
});

Order.belongsTo(Customer, { foreignKey: "customerId" });

Order.sync()
  .then(() => {
    console.log("Order table synced successfuly!");
  })
  .catch(() => {
    console.log("Order table is not synced");
  });

export default Order;
