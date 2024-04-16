import express from "express";
const router = express.Router();
import { createCustomer, loginCustomer } from "../controllers/customer/CustomerAccountController.js";

router.post("/register", createCustomer);

router.post("/login", loginCustomer)

export default router;
