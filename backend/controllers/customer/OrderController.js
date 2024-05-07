import { where } from "sequelize";
import Order from "../../models/Order.js";
import OrderItem from "../../models/OrderItem.js";
import OrderStatus from "../../models/OrderStatus.js";

export const createOrder = async (req, res) => {
  const {
    customerId,
    deliveryMethod,
    deliveryAddress,
    orderTotal,
    paymentMethod,
    orderStatus,
    selectedItems,
  } = req.body;
  console.log("hello");
  try {
    const newOrder = await Order.create({
      customerId,
      deliveryAddress,
      deliveryMethod,
      orderTotal,
      paymentMethod,
      orderStatus,
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

    res.status(200).json({ message: "successfully order inserted!" });
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
    // Update order status
    order.orderStatus = orderStatus;

    // Save the updated order
    await order.save();

    // Respond with the updated order
    res.status(200).json(order);
  } catch (err) {
    console.error("Error updating order status:", err);
    res.status(500).json({ error: "Server error" });
  }
};
