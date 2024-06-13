import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const Table = sequelize.define(
  "table",
  {
    tableId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    tableName: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    noOfGuests: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 20,
      },
    },
    orderDateTime: {
      type: DataTypes.DATE,
    },
    reservationDateTime: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "table",
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
