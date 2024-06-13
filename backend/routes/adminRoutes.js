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
  updateItem,
} from "../controllers/admin/ItemController.js";

import {
  createStaff,
  deleteStaff,
  getStaffs,
  updateStaff,
} from "../controllers/admin/StaffController.js";

import {
  getTotalEarnings,
  getDailyTotalOrders,
  getOrderCountsByType,
  getOrdersByDate,
  getTotalAmountByPaymentMethod,
} from "../controllers/admin/AdminOrderController.js";

import {
  createDailyAttendanceRecords,
  createStaffAttendance,
  getAttendance,
  updateAttendance,
} from "../controllers/admin/AttendanceController.js";
import {
  deleteReservation,
  getReservations,
} from "../controllers/admin/AdminReservationController.js";
import {
  createAdmin,
  loginAdmin,
} from "../controllers/admin/AdminAccountController.js";
import {
  getOrdersCountByTypeDuration,
  getOrdersByDuration,
  getSoldItemsByDuration,
} from "../controllers/admin/AdminBusinessReportController.js";
import {
  createTable,
  deleteTable,
  getAllTables,
  getAvailableTables,
  updateOrderTimeToNull,
  updateReserveDateTime,
  updateReserveDateTimeToNull,
  updateTable,
} from "../controllers/admin/TableController.js";
import {
  deleteFeedback,
  getFeedback,
} from "../controllers/customer/FeedbackController.js";
import {
  deleteSupport,
  getSupports,
} from "../controllers/customer/SupportController.js";
import {
  createTodaySummary,
  getAllSummaries,
  getSummary,
} from "../controllers/admin/DailySummaryController.js";
import {
  getCountsByRole,
  getWorkedEmployees,
} from "../controllers/admin/AdminAttendanceReport.js";

router.post("/create-account", createAdmin);
router.post("/login", loginAdmin);

router.post("/categories", createCategory);
router.get("/categories", getCategories);
router.patch("/categories/:id", editCategory);
router.delete("/categories/:id", deleteCategory);

router.post("/items", createItem);
router.get("/items", getItem);
router.delete("/items/:id", deleteItem);
router.put("/items/:id", updateItem);

router.post("/staff", createStaff);
router.put("/staff/update/:NIC", updateStaff);
router.get("/staffs", getStaffs);
router.delete("/staff/:NIC", deleteStaff);

router.get("/orders/today-earnings", getTotalEarnings);
router.get("/daily-total-orders", getDailyTotalOrders);
router.get("/order-counts-by-type", getOrderCountsByType);
router.get("/orders/day/:date", getOrdersByDate);
router.get(
  "/orders/businessAmount-by-payment-type",
  getTotalAmountByPaymentMethod
);

router.post("/attendance/create-daily", createDailyAttendanceRecords);
router.post("/update-attendance", updateAttendance);
router.get("/attendance", getAttendance);
router.post("/create/attendance", createStaffAttendance);

router.get("/customer-reservations", getReservations);
router.delete("/delete/reservation/:reservationId", deleteReservation);

router.get("/total-orders/:duration", getOrdersByDuration);
router.get("/order-count-by-type/:duration", getOrdersCountByTypeDuration);
router.get("/orders/sold-items/:duration", getSoldItemsByDuration);

router.post("/table", createTable);
router.get("/tables", getAvailableTables);
router.get("/all-tables", getAllTables);
router.delete("/table/:tableId", deleteTable);
router.put("/tables/update/:tableName", updateTable);
router.put("/table/clear-table/:tableName", updateOrderTimeToNull);
router.put("/table/update-reserve-time/:tableName", updateReserveDateTime);
router.put("/table/clear-reservation/:tableName", updateReserveDateTimeToNull);

router.get("/customer/feedbacks", getFeedback);
router.get("/customer/supports", getSupports);
router.delete("/customer/feedback/:feedbackId", deleteFeedback);
router.delete("/customer/support/:suppportId", deleteSupport);

router.post("/orders/today/summary", createTodaySummary);
router.get("/orders/daily-summary", getAllSummaries);

router.get("/staff/counts-by-role/:duration", getCountsByRole);
router.get("/staff/attended/:duration", getWorkedEmployees);

export default router;
