import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Customer from "./Customer.js";

const Session = sequelize.define("session", {
  sessionId: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  expirationTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});
  

Customer.hasOne(Session, { foreignKey: "customerId" });

Session.sync()
  .then(() => {
    console.log("Session table synced successfully!");
  })
  .catch((err) => {
    console.error("Error in syncing:", err);
  });

export default Session;
