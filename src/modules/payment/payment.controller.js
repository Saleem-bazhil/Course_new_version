import asyncHandler from "../../utils/asyncHandler.js";
import { success } from "../../utils/apiResponse.js";
import ApiError from "../../utils/ApiError.js";
import {
  createRazorpayOrderService,
  verifyPaymentService,
} from "./payment.service.js";

export const createOrder = asyncHandler(async (req, res) => {
  const amount = Number(req.body.amount);
  if (!amount || isNaN(amount) || amount <= 0) {
    throw new ApiError("Amount is required and must be a valid number", 400);
  }
  const order = await createRazorpayOrderService(amount);
  return success( res, { order }, "Order created successfully" );
});

export const paymentVerification = asyncHandler(async (req, res) => {
  const { guideId } = req.body;

  if (!guideId) {
    throw new ApiError("guideId is required for payment verification", 400);
  }

  if (!req.user || !req.user.id) {
    throw new ApiError("Unauthorized", 401);
  }

  const payment = await verifyPaymentService({
    ...req.body,
    userId: req.user.id,
    guideId,
  });

  if (!payment) {
    throw new ApiError("Invalid payment details", 400);
  }

  return success(res, { payment }, "Payment verified successfully");
});
