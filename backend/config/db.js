import Sequelize from "sequelize";

console.log("Before syncing db");
const sequelize = new Sequelize("moju_restaurant_db", "postgres", "123456", {
  host: "localhost",
  dialect: "postgres",
  define: {
    freezeTableName: true,
    timestamps: false,
  },
});
console.log("verified credentials");

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection successful");
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
  });

export default sequelize;
