import express from "express";
const router = express.Router();

// Import module routes here
import pdfRoutes from "./modules/pdf/pdf.routes.js";
import paymentRoutes from "./modules/payment/payment.routes.js";
import userRoutes from "./modules/users/user.routes.js";
import courseRoutes from "./modules/course/course.routes.js";

router.use("/pdf", pdfRoutes);
router.use("/payment", paymentRoutes);
router.use("/users", userRoutes);
router.use("/courses",courseRoutes)

export default router;
