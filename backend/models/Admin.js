import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Admin = sequelize.define("admin", {
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Admin.sync()
  .then(() => {
    console.log("Admin Table synced sucessfully!");
  })
  .catch((err) => {
    console.log("Error in signing admin table", err);
  });

export default Admin;
