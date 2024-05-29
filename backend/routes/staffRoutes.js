import express from "express";
const router = express.Router();
import {
  getAllOrders,
  getDeliveredOrders,
  getUndeliveredOrders,
  updateDelivered,
  updatePicked,
  updatePrepared,
} from "../controllers/staff/OrderController.js";

router.get("/orders", getUndeliveredOrders);
router.get("/delivered-orders", getDeliveredOrders);

router.put("/orders/:orderId/prepared", updatePrepared);
router.put("/orders/:orderId/picked", updatePicked);
router.put("/orders/:orderId/delivered", updateDelivered);

export default router;
