import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
import Staff from "./Staff.js";

const Attendance = sequelize.define("attendance", {
  date: {
    type: DataTypes.DATEONLY,
    primaryKey: true,
    allowNull: false,
  },
  NIC: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    references: {
      model: Staff, // Reference to the Staff model
      key: "NIC", // The primary key of the Staff model
    },
  },
  comingIn: {
    type: DataTypes.TIME,
    allowNull: true,
  },
  goingOut: {
    type: DataTypes.TIME,
    allowNull: true,
  },
});

Attendance.sync()
  .then(() => {
    console.log("Attendance Table synced Successfully!");
  })
  .catch((err) => {
    console.log("Error in syncing Attendance table", err);
  });

export default Attendance;
