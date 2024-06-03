import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const Feedback = sequelize.define("feedback", {
  feedbackId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  customerId: {
    type: DataTypes.INTEGER,
  },
  orderId: {
    type: DataTypes.INTEGER,
  },
  feedback: {
    type: DataTypes.STRING,
  },
});

Feedback.sync()
  .then(() => {
    console.log("Feedback Table synced successfully");
  })
  .catch((err) => {
    console.log("Error in syncing feeedback table", err);
  });

export default Feedback;
