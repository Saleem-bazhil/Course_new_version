import express from "express";
<<<<<<< HEAD
import { createOrder, paymentVerification, getMyPurchases } from "./payment.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/order", authenticate, createOrder);
router.post("/paymentVerification", authenticate, paymentVerification);
router.get("/my-purchases", authenticate, getMyPurchases);
=======
import { createOrder, paymentVerification } from "./payment.controller.js";
import auth from "../../middlewares/auth.middleware.js";

const router = express.Router();

// All payment routes require authentication so we can link
// payments to a specific user.
router.post("/order", auth, createOrder);
router.post("/paymentVerification", auth, paymentVerification);
>>>>>>> recover-admin

export default router;
