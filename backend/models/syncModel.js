import { Order, OrderItem, Item } from "./association.js";

const syncModels = async () => {
  try {
    await Order.sync();
    console.log("Order table synced successfully!");

    await OrderItem.sync();
    console.log("OrderItem table synced successfully!");

    await Item.sync();
    console.log("Item table synced successfully!");
  } catch (error) {
    console.error("Error syncing tables:", error);
  }
};

export default syncModels;
