import express from "express";
const router = express.Router();
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

router.post("/register", createCustomer);
router.post("/login", loginCustomer);
router.put("/:customerId", updateMembership);

router.post("/orders", createOrder);
router.get("/order/:orderId", getOrderByOrderId);
router.get("/orders/:customerId", getOrders);
router.get("/order/:orderId/items", getItemsOfOrder);

router.get("/order-order-status/:orderId", getOrderStatus);
router.put("/order/:orderId", updateOrderStatus);

export default router;
