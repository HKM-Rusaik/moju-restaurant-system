import express from "express";
import auth from "../middlewares/auth.js";
import Customer from "../models/Customer.js";

const router = express.Router();

router.get("/me", auth, async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.customer.id, {
      attributes: { exclude: ["passwordHash"] }, // Exclude the password hash from the response
    });
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.json({ customer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
