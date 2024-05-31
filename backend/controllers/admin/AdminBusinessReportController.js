import { Op, Sequelize } from "sequelize";
import Order from "../../models/Order.js";
import OrderItem from "../../models/OrderItem.js";
import Item from "../../models/Item.js";

const getStartDateForDuration = (duration) => {
  const now = new Date();
  let startDate;

  switch (duration) {
    case "today":
      startDate = new Date(now.setHours(0, 0, 0, 0)); // Start of today
      break;
    case "week":
      startDate = new Date(now.setDate(now.getDate() - 7)); // Start of one week ago
      break;
    case "month":
      startDate = new Date(now.setMonth(now.getMonth() - 1)); // Start of one month ago
      break;
    default:
      throw new Error("Invalid duration specified");
  }

  return startDate;
};

export const getOrdersByDuration = async (req, res) => {
  const { duration } = req.params;

  try {
    const startDate = getStartDateForDuration(duration);

    const ordersByDuration = await Order.findAll({
      where: {
        orderDate: {
          [Op.gte]: startDate,
        },
      },
      attributes: [
        [Sequelize.fn("DATE", Sequelize.col("orderDate")), "orderDate"],
        [Sequelize.fn("SUM", Sequelize.col("orderTotal")), "totalOrderAmount"],
      ],
      group: [Sequelize.fn("DATE", Sequelize.col("orderDate"))],
      order: [[Sequelize.fn("DATE", Sequelize.col("orderDate")), "ASC"]],
    });

    const formattedResults = ordersByDuration.map((record) => ({
      orderDate: record.getDataValue("orderDate"),
      totalOrderAmount: record.getDataValue("totalOrderAmount"),
    }));

    res.status(200).json(formattedResults);
  } catch (error) {
    console.error("Error fetching orders by duration:", error);
    res.status(500).json({ error: "Could not fetch orders by duration." });
  }
};

// Function to count orders by type within a given duration
export const getOrdersCountByTypeDuration = async (req, res) => {
  const { duration } = req.params;

  try {
    const startDate = getStartDateForDuration(duration);

    const ordersByDuration = await Order.findAll({
      where: {
        orderDate: {
          [Op.gte]: startDate,
        },
      },
    });

    // Process data to count orders by type
    const orderCountsByType = ordersByDuration.reduce((acc, order) => {
      const orderType = order.orderType;
      if (acc[orderType]) {
        acc[orderType] += 1;
      } else {
        acc[orderType] = 1;
      }
      return acc;
    }, {});

    // Send the count of orders by type as a response
    res.status(200).json(orderCountsByType);
  } catch (error) {
    console.error("Error fetching orders count by type:", error);
    res.status(500).json({ error: "Could not fetch orders count by type." });
  }
};

export const getSoldItemsByDuration = async (req, res) => {
  const { duration } = req.params;

  try {
    const startDate = getStartDateForDuration(duration);

    const soldItems = await OrderItem.findAll({
      attributes: [
        "itemId",
        [Sequelize.fn("SUM", Sequelize.col("quantity")), "totalQuantity"],
      ],
      include: [
        {
          model: Order,
          where: {
            orderDate: {
              [Op.gte]: startDate,
            },
          },
          attributes: [], // We don't need any attributes from Order
        },
      ],
      group: ["itemId"],
      order: [[Sequelize.literal('"totalQuantity"'), "DESC"]],
    });

    if (soldItems.length === 0) {
      return res.status(200).json({ message: "No items sold in this duration." });
    }

    const itemDetailsPromises = soldItems.map(async (orderItem) => {
      const itemDetails = await Item.findByPk(orderItem.itemId);
      return {
        itemId: orderItem.itemId,
        itemName: itemDetails.itemName, // Ensure you use the correct attribute name
        totalQuantity: orderItem.getDataValue("totalQuantity"),
      };
    });

    const itemsWithDetails = await Promise.all(itemDetailsPromises);

    res.status(200).json(itemsWithDetails);
  } catch (error) {
    console.error("Error fetching sold items by duration:", error);
    res.status(500).json({ error: "Could not fetch sold items by duration." });
  }
};
