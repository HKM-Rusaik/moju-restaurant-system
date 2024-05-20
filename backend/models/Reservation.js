import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
import Sequelize from "sequelize"; // Ensure Sequelize is imported
import Customer from "./Customer.js";

const Reservation = sequelize.define(
  "reservation",
  {
    reservationId: {
      type: DataTypes.INTEGER, // Use INTEGER for auto-increment primary key
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    reservationDate: {
      type: DataTypes.DATE,
      allowNull: false, // This will store the date and time selected by the user
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW, // This will automatically set the current timestamp when the reservation is created
    },
    noOfGuests: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

Reservation.belongsTo(Customer, { foreignKey: "customerId" });

Reservation.sync()
  .then(() => {
    console.log("Reservation Table synced successfully");
  })
  .catch((err) => {
    console.log("Error in syncing reservation table", err);
  });

export default Reservation;
