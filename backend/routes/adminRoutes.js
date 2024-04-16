import express from "express";
const router = express.Router();
import {
  createCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} from "../controllers/admin/CategoryController.js";

import {
  createItem,
  getItem,
  deleteItem,
} from "../controllers/admin/ItemController.js";

router.post("/categories", createCategory);
router.get("/categories", getCategory);
router.patch("/categories/:id", updateCategory);
router.delete("/categories/:id", deleteCategory);

router.post("/items", createItem);
router.get("/items", getItem);
router.delete("/items/:id", deleteItem);

export default router;
