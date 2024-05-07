import express from "express";
const router = express.Router();
import {
  createCustomer,
  loginCustomer,
} from "../controllers/customer/CustomerAccountController.js";
// import { requireCustomerAuth } from "../middlewares/authMiddleware.js";
import {
  createOrder,
  getOrderByOrderId,
  getOrders,
  getOrderStatus,
  updateOrderStatus,
} from "../controllers/customer/OrderController.js";

router.post("/register", createCustomer);
router.post("/login", loginCustomer);

router.post("/orders", createOrder);
router.get("/order/:orderId", getOrderByOrderId);
router.get("/orders/:customerId", getOrders);

router.get("/order/:orderId", getOrderStatus);
router.put("/order/:orderId", updateOrderStatus);

export default router;
