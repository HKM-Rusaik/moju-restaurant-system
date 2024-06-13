import { where } from "sequelize";
import Order from "../../models/Order.js";
import OrderItem from "../../models/OrderItem.js";
import OrderStatus from "../../models/OrderStatus.js";
import Item from "../../models/Item.js";
import { Sequelize } from "sequelize";

export const createOrder = async (req, res) => {
  const {
    customerId,
    deliveryMethod,
    deliveryAddress,
    orderTotal,
    paymentMethod,
    orderStatus,
    selectedItems,
    pdfUrl,
  } = req.body;
  console.log("hello");
  try {
    const newOrder = await Order.create({
      customerId,
      deliveryAddress,
      orderType: deliveryMethod,
      orderTotal,
      paymentMethod,
      orderStatus: "ready to prepare",
      billUrl: pdfUrl,
    });
    console.log("hello");
    await Promise.all(
      selectedItems.map(async (item) => {
        await OrderItem.create({
          orderId: newOrder.orderId,
          itemId: item.itemId,
          quantity: item.quantity,
        });
      })
    );

    await OrderStatus.create({
      orderId: newOrder.orderId,
      prepared: false,
      picked: false,
      delivered: false,
    });

    res.status(200).json({ message: "successfully order inserted!", newOrder });
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
};

export const getOrders = async (req, res) => {
  const { customerId } = req.params;

  try {
    const orders = await Order.findAll({ where: { customerId } });
    res.status(200).json({ orders });
  } catch (Error) {
    res.status(500).json({ error: "server error" });
  }
};

export const getOrderStatus = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await OrderStatus.findOne({ where: { orderId } });
    res.status(200).json({ order });
  } catch (err) {
    res.status(500).json({ error: "server error" });
  }
};

export const getOrderByOrderId = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findOne({ where: { orderId } });
    res.status(200).json({ order });
  } catch (err) {
    res.status(500).json({ error: "server error" });
  }
};

export const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { orderStatus } = req.body;

  try {
    let order = await Order.findOne({ where: { orderId } });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    order.orderStatus = orderStatus;

    await order.save();

    res.status(200).json(order);
  } catch (err) {
    console.error("Error updating order status:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const getItemsOfOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const items = await OrderItem.findAll({
      where: { orderId },
      attributes: ["quantity"],
      include: [{ model: Item, attributes: ["itemName"] }],
    });

    if (!items) {
      return res
        .status(404)
        .json({ error: "Items not found for the order ID" });
    }

    return res.status(200).json(items);
  } catch (err) {
    console.error("Error fetching items:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const updateBillUrl = async (req, res) => {
  const { orderId } = req.params;
  const { pdfUrl } = req.body;

  try {
    // Find the order by its ID
    let order = await Order.findOne({ where: { orderId } });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Update the billUrl attribute of the order
    order.billUrl = pdfUrl;

    // Save the changes to the database
    await order.save();

    return res
      .status(200)
      .json({ message: "Bill URL updated successfully", order });
  } catch (error) {
    console.error("Error updating bill URL:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

//cancel order
export const cancelorder = async (req, res) => {
  const { orderId } = req.params;
  try {
    // Find the order status by orderId
    const orderStatus = await OrderStatus.findOne({ where: { orderId } });
    if (!orderStatus) {
      return res
        .status(404)
        .json({ message: "Order Id not found in order status table" });
    }
    // Delete the order status entry
    await orderStatus.destroy();

    // Find all order items by orderId
    const orderItems = await OrderItem.findAll({ where: { orderId } });
    if (orderItems.length === 0) {
      return res
        .status(404)
        .json({ message: "Order Id not found in Order Item table" });
    }
    // Loop through each order item and delete them
    for (const item of orderItems) {
      await item.destroy();
    }

    // Find the order by orderId
    const order = await Order.findOne({ where: { orderId } });
    if (!order) {
      return res
        .status(404)
        .json({ message: "Order Id not found in order table" });
    }
    // Delete the order entry
    await order.destroy();

    res.status(200).json({ message: "Order cancelled successfully" });
  } catch (err) {
    console.error("Error in canceling order:", err);
    res.status(500).json({ error: "Error in canceling order" });
  }
};
