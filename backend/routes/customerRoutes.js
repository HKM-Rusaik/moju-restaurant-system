import express from "express";

import {
  createCustomer,
  loginCustomer,
} from "../controllers/customer/CustomerAccountController.js";

import {
  createOrder,
  getOrderByOrderId,
  getOrders,
  getOrderStatus,
  updateOrderStatus,
  getItemsOfOrder,
} from "../controllers/customer/OrderController.js";

import { updateMembership } from "../controllers/customer/CustomerAccountController.js";
import auth from "../middlewares/auth.js";
import Customer from "../models/Customer.js";
import { createReservation } from "../controllers/customer/ReservationController.js";

const router = express.Router();
router.post("/register", createCustomer);
router.post("/login", loginCustomer);

router.get("/me", auth, async (req, res) => {
  try {
    console.log(req.customer.customerId);
    const customer = await Customer.findByPk(req.customer.customerId, {
      attributes: { exclude: ["passwordHash"] }, // Exclude the password hash from the response
    });
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json({ customer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:customerId", auth, updateMembership);

router.post("/orders", createOrder);
router.get("/order/:orderId", getOrderByOrderId);
router.get("/orders/:customerId", getOrders);
router.get("/order/:orderId/items", getItemsOfOrder);

router.get("/order-order-status/:orderId", getOrderStatus);
router.put("/order/:orderId", updateOrderStatus);

router.post("/reservation", createReservation);
export default router;
