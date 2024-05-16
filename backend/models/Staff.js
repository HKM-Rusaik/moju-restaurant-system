import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const Staff = sequelize.define("staff", {
  NIC: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  staffName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mobileNo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Staff.sync()
  .then(() => {
    console.log("Staff Table synced Successfully!");
  })
  .catch((err) => {
    console.log("error in syncing staff table", err);
  });

export default Staff;
