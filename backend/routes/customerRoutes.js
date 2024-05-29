import express from "express";

import {
  createCustomer,
  deleteAccount,
  loginCustomer,
  updateAccount,
} from "../controllers/customer/CustomerAccountController.js";

import {
  createOrder,
  getOrderByOrderId,
  getOrders,
  getOrderStatus,
  updateOrderStatus,
  getItemsOfOrder,
  updateBillUrl,
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
      attributes: { exclude: ["passwordHash"] },
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

router.delete("/deleteAccount", auth, deleteAccount);
router.put("/update-membership/:customerId", auth, updateMembership);
router.put("/updateProfile/:customerId", updateAccount);

router.post("/orders", createOrder);
router.get("/order/:orderId", getOrderByOrderId);
router.put("/order/:orderId", updateBillUrl);
router.get("/orders/:customerId", getOrders);
router.get("/order/:orderId/items", getItemsOfOrder);

router.get("/order-order-status/:orderId", getOrderStatus);
// router.put("/order/:orderId", updateOrderStatus);

router.post("/reservation", createReservation);
export default router;
