import Order from "../../models/Order.js";
import { Op } from "sequelize";

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
