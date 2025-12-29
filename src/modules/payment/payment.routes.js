import express from "express";
import { createOrder, paymentVerification } from "./payment.controller.js";
import auth from "../../middlewares/auth.middleware.js";

const router = express.Router();

// All payment routes require authentication so we can link
// payments to a specific user.
router.post("/order", auth, createOrder);
router.post("/paymentVerification", auth, paymentVerification);

export default router;
