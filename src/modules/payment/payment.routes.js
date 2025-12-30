import express from "express";
import { createOrder, paymentVerification, getMyPurchases } from "./payment.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/order", authenticate, createOrder);
router.post("/paymentVerification", authenticate, paymentVerification);
router.get("/my-purchases", authenticate, getMyPurchases);

export default router;
