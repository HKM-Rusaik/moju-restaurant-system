// admin.js

"use strict";
const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  class Admin extends Model {}

  Admin.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensure usernames are unique
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Admin",
      tableName: "admins", // Optional: Define the table name explicitly
      timestamps: true, // Optional: Include timestamps (createdAt, updatedAt)
      underscored: true, // Optional: Use underscored naming convention for columns
    }
  );

  return Admin;
};
