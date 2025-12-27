import express from "express";
const router = express.Router();

// Import module routes here
import pdfRoutes from "./modules/pdf/pdf.routes.js";
router.use("/pdf", pdfRoutes);

import paymentRoutes from "./modules/payment/payment.routes.js";
router.use("/payment", paymentRoutes);

export default router;
