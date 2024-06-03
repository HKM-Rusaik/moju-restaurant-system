import Order from "../../models/Order.js";
import { Op } from "sequelize";
import { Sequelize } from "sequelize";

export const getTotalEarnings = async (req, res) => {
  try {
    // Get the current date and format it to start and end of the day
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // Calculate the total earnings of the day
    const totalEarnings = await Order.sum("orderTotal", {
      where: {
        orderDate: {
          [Op.between]: [startOfDay, endOfDay],
        },
      },
    });

    res.status(200).json({ totalEarnings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDailyTotalOrders = async (req, res) => {
  try {
    const dailyTotals = await Order.findAll({
      attributes: [
        [Sequelize.fn("DATE", Sequelize.col("orderDate")), "orderDate"],
        [Sequelize.fn("SUM", Sequelize.col("orderTotal")), "totalOrderAmount"],
      ],
      group: [Sequelize.fn("DATE", Sequelize.col("orderDate"))],
      order: [[Sequelize.fn("DATE", Sequelize.col("orderDate")), "ASC"]],
    });

    const formattedResults = dailyTotals.map((record) => ({
      orderDate: record.getDataValue("orderDate"),
      totalOrderAmount: record.getDataValue("totalOrderAmount"),
    }));

    res.status(200).json(formattedResults);
  } catch (error) {
    console.error("Error fetching daily total orders:", error);
    res.status(500).json({ error: "Could not fetch daily total orders." });
  }
};

export const getOrderCountsByType = async (req, res) => {
  try {
    // Fetch all orders
    const orders = await Order.findAll();

    // Process data to count orders by type
    const orderCountsByType = orders.reduce((acc, order) => {
      const orderType = order.orderType;
      if (acc[orderType]) {
        acc[orderType] += 1;
      } else {
        acc[orderType] = 1;
      }
      return acc;
    }, {});

    // Transform the orderCountsByType object into an array of objects with name and value
    const orderCountsArray = Object.keys(orderCountsByType).map(
      (orderType) => ({
        name: orderType,
        value: orderCountsByType[orderType],
      })
    );

    res.status(200).json(orderCountsArray);
    console.log(orderCountsArray);
  } catch (error) {
    console.error("Error fetching order counts by type:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// New method to get orders by a specific date
export const getOrdersByDate = async (req, res) => {
  const { date } = req.params; // Expected format: YYYY-MM-DD
  try {
    const orders = await Order.findAll({
      where: Sequelize.where(
        Sequelize.fn("DATE", Sequelize.col("orderDate")),
        date
      ),
    });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders by date:", error);
    res.status(500).json({ error: "Could not fetch orders by date." });
  }
};
