import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Customer = sequelize.define("customer", {
  customerId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  streetName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cityName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  membership: {
    type: DataTypes.STRING,
  },
});

Customer.sync()
  .then(() => {
    console.log("Customer table synced successfully!");
  })
  .catch((err) => {
    console.log("Error in syncing:", err);
  });

export default Customer;
