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

router.post("/categories", createCategory);
router.get("/categories", getCategories);
router.patch("/categories/:id", editCategory);
router.delete("/categories/:id", deleteCategory);

router.post("/items", createItem);
router.get("/items", getItem);
router.delete("/items/:id", deleteItem);

router.post("/staff", createStaff);
router.get("/staffs", getStaffs);

// router.post()

export default router;
