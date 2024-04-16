import sequelize from "../config/db";
import { DataTypes } from "sequelize";

const OrderItem = sequelize.define(
  "order_item",
  {
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
  },
  {
    primaryKey: true,
    uniqueKeys: {
      orderItemUnique: {
        fields: ["orderId", "itemId"],
      },
    },
  }
);

OrderItem.associate = (models) => {
  OrderItem.belongsTo(models.Order, { foreignKey: "orderId" });
  OrderItem.belongsTo(models.Item, { foreignKey: "itemId" });
};

OrderItem.sync()
  .then(() => {
    console.log("OrderItem table synced successfully!");
  })
  .catch((err) => {
    console.error("OrderItem error in syncing:", err);
  });

export default OrderItem;
