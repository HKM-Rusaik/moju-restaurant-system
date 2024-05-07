import express from "express";
import cors from "cors";
import customerRoutes from "../backend/routes/customerRoutes.js";
import adminRoutes from "../backend/routes/adminRoutes.js";
import staffRoutes from "../backend/routes/staffRoutes.js";
// import db from './models/index.cjs';

const app = express();

app.use(express.json());
app.use(cors());

app.use("/customer", customerRoutes);

app.use("/admin", adminRoutes);

app.use("/staff", staffRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
