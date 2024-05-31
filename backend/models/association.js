import Order from "./Order.js";
import OrderItem from "./OrderItem.js";
import Item from "./Item.js";

// Define the associations
Order.hasMany(OrderItem, { foreignKey: "orderId" });
OrderItem.belongsTo(Order, { foreignKey: "orderId" });

Item.hasMany(OrderItem, { foreignKey: "itemId" });
OrderItem.belongsTo(Item, { foreignKey: "itemId" });

// Export models with associations set up
export { Order, OrderItem, Item };
