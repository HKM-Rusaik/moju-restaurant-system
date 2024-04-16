import Sequelize from "sequelize";

const sequelize = new Sequelize("moju_restaurant_db", "postgres", "123456", {
  host: "localhost",
  dialect: "postgres",
  define: {
    freezeTableName: true,
    timestamps: false,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection successful");
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
  });

export default sequelize;
