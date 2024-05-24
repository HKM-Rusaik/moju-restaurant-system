import express from "express";
const router = express.Router();
import {
  createCategory,
  deleteCategory,
  getCategories,
  editCategory,
} from "../controllers/admin/CategoryController.js";

import {
  createItem,
  getItem,
  deleteItem,
} from "../controllers/admin/ItemController.js";

import {
  createStaff,
  getStaffs,
} from "../controllers/admin/StaffController.js";

import {
  getTotalEarnings,
  getDailyTotalOrders,
  getOrderCountsByType,
} from "../controllers/admin/AdminOrderController.js";

import {
  createDailyAttendanceRecords,
  getAttendance,
  updateAttendance,
} from "../controllers/admin/AttendanceController.js";
import { getReservations } from "../controllers/admin/AdminReservationController.js";

router.post("/categories", createCategory);
router.get("/categories", getCategories);
router.patch("/categories/:id", editCategory);
router.delete("/categories/:id", deleteCategory);

router.post("/items", createItem);
router.get("/items", getItem);
router.delete("/items/:id", deleteItem);

router.post("/staff", createStaff);
router.get("/staffs", getStaffs);

router.get("/orders/today-earnings", getTotalEarnings);
router.get("/daily-total-orders", getDailyTotalOrders);
router.get("/order-counts-by-type", getOrderCountsByType);

router.post("/attendance/create-daily", createDailyAttendanceRecords);
router.post("/update-attendance", updateAttendance);
router.get("/attendance", getAttendance);

router.get("/customer-reservations", getReservations)

export default router;
