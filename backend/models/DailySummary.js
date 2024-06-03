import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const DailyProfit = sequelize.define("daily_summary", {
  date: {
    type: DataTypes.DATEONLY,
    primaryKey: true,
    allowNull: false,
  },
  businessTotal: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  expenses: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

DailyProfit.sync()
  .then(() => {
    console.log("Daily summary Table successfully synced");
  })
  .catch((err) => {
    console.log("Error in syncing daily summary table");
  });

export default DailyProfit;
