import express from "express";
const router = express.Router();
import {
  getAllOrders,
  updateDelivered,
  updatePicked,
  updatePrepared,
} from "../controllers/staff/OrderController.js";

router.get("/orders", getAllOrders);

router.put("/orders/:orderId/prepared", updatePrepared);
router.put("/orders/:orderId/picked", updatePicked);
router.put("/orders/:orderId/delivered", updateDelivered);

export default router;
