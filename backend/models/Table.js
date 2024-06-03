import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const Table = sequelize.define(
  "table",
  {
    tableId: {
      type: DataTypes.INTEGER, // Use INTEGER for auto-increment primary key
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    tableName: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true, // Make tableName also a primary key
    },
    noOfGuests: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1, // Minimum 1 guest
        max: 20, // Maximum 20 guests
      },
    },
  },
  {
    tableName: "tables", // Set the table name
    timestamps: false,
  }
);

Table.sync()
  .then(() => {
    console.log("Table synced successfully");
  })
  .catch((err) => {
    console.log("Error in syncing table", err);
  });

export default Table;
