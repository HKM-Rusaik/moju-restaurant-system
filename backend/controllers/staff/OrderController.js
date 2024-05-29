import Order from "../../models/Order.js";
import Customer from "../../models/Customer.js";
import OrderStatus from "../../models/OrderStatus.js";

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: Customer,
          attributes: [
            "customerId",
            "firstName",
            "lastName",
            "streetName",
            "cityName",
            "phoneNumber",
          ],
        },
        {
          model: OrderStatus,
          attributes: ["prepared", "picked", "delivered"],
        },
      ],
      raw: true,
    });

    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updatePrepared = async (req, res) => {
  const { orderId } = req.params;

  try {
    const orderStatus = await OrderStatus.findOne({ where: { orderId } });
    if (orderStatus) {
      orderStatus.prepared = true;
      await orderStatus.save();

      const order = await Order.findOne({ where: { orderId: orderId } });
      if (order) {
        order.orderStatus = "Prepared";
        await order.save();
      }

      return res
        .status(200)
        .json({ message: "Prepared status updated successfully" });
    } else {
      return res.status(404).json({ error: "Order status not found" });
    }
  } catch (error) {
    console.error("Error updating prepared status:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updatePicked = async (req, res) => {
  const { orderId } = req.params;

  try {
    const orderStatus = await OrderStatus.findOne({ where: { orderId } });
    if (orderStatus) {
      orderStatus.picked = true;
      await orderStatus.save();

      const order = await Order.findOne({ where: { orderId: orderId } });
      if (order) {
        order.orderStatus = "Picked";
        await order.save();
      }

      return res
        .status(200)
        .json({ message: "Picked status updated successfully" });
    } else {
      return res.status(404).json({ error: "Order status not found" });
    }
  } catch (error) {
    console.error("Error updating picked status:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateDelivered = async (req, res) => {
  const { orderId } = req.params;

  try {
    const orderStatus = await OrderStatus.findOne({ where: { orderId } });
    if (orderStatus) {
      orderStatus.delivered = true;
      await orderStatus.save();

      const order = await Order.findOne({ where: { orderId: orderId } });
      if (order) {
        order.orderStatus = "Delivered";
        await order.save();
      }

      return res
        .status(200)
        .json({ message: "Delivered status updated successfully" });
    } else {
      return res.status(404).json({ error: "Order status not found" });
    }
  } catch (error) {
    console.error("Error updating delivered status:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getDeliveredOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: Customer,
          attributes: [
            "customerId",
            "firstName",
            "lastName",
            "streetName",
            "cityName",
            "phoneNumber",
          ],
        },
        {
          model: OrderStatus,
          where: {
            delivered: true, // Assuming `delivered` is a boolean indicating if the order is delivered
          },
        },
      ],
      raw: true,
    });

    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getUndeliveredOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: Customer,
          attributes: [
            "customerId",
            "firstName",
            "lastName",
            "streetName",
            "cityName",
            "phoneNumber",
          ],
        },
        {
          model: OrderStatus,
          attributes: ["prepared", "picked", "delivered"],
          where: {
            delivered: false, // Filter for undelivered orders
          },
        },
      ],
      raw: true,
    });

    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
