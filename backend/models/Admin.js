import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const Admin = sequelize.define(
  "admin",
  {
    adminId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

Admin.sync()
  .then(() => {
    console.log("Admin Table successfully created");
  })
  .catch((err) => {
    console.log("error in syncing admin table", err);
  });

export default Admin;
