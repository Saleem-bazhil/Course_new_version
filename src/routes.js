import express from "express";
const router = express.Router();

// Import module routes here
import pdfRoutes from "./modules/pdf/pdf.routes.js";
router.use("/pdf", pdfRoutes);

import paymentRoutes from "./modules/payment/payment.routes.js";
router.use("/payment", paymentRoutes);

import userRoutes from "./modules/users/user.routes.js";
router.use("/users", userRoutes);

export default router;
