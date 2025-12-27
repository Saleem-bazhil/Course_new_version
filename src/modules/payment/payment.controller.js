import asyncHandler from "../../utils/asyncHandler.js";
import { success } from "../../utils/apiResponse.js";
import ApiError from "../../utils/ApiError.js";
import {
  createRazorpayOrderService,
  verifyPaymentService,
} from "./payment.service.js";

export const createOrder = asyncHandler(async (req, res) => {
  const { amount } = req.body;

  if (!amount) {
    throw new ApiError("Amount is required", 400);
  }

  const order = await createRazorpayOrderService(amount);
  success(res, order, "Order created successfully");
});

export const paymentVerification = asyncHandler(async (req, res) => {
  const payment = await verifyPaymentService(req.body);

  if (!payment) {
    throw new ApiError("Invalid payment signature", 400);
  }

  res.redirect(
    `http://localhost:5173/paymentsuccess?reference=${payment.razorpay_payment_id}`
  );
});
