import express from "express";
import cors from "cors";
import sequelize from "./config/db.js"; // Ensure this path is correct
import syncModels from "./models/syncModel.js"; // Ensure this path is correct
import customerRoutes from "../backend/routes/customerRoutes.js";
import adminRoutes from "../backend/routes/adminRoutes.js";
import staffRoutes from "../backend/routes/staffRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/customer", customerRoutes);
app.use("/admin", adminRoutes);
app.use("/staff", staffRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to the database
    await sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully."
    );

    // Synchronize the models
    await syncModels();

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();
