import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const Support = sequelize.define("support", {
  supportId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  customerName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  customerEmail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Support.sync()
  .then(() => {
    console.log("Support Table Synced successfully");
  })
  .catch((err) => {
    console.log("error in syncing support table", err);
  });

export default Support;
