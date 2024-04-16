import express from "express";
import cors from "cors";
import customerRoutes from "../backend/routes/customerRoutes.js";
import adminRoutes from "../backend/routes/adminRoutes.js";
// import session from "express-session";
// import passport from "passport";

const app = express();

app.use(express.json());
app.use(cors());

// app.use(passport.initialize());
// app.use(passport.session());

app.use("/customer", customerRoutes);

app.use("/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
