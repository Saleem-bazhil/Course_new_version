import asyncHandler from "../../utils/asyncHandler.js";
import { success } from "../../utils/apiResponse.js";
import ApiError from "../../utils/ApiError.js";
import {
  createRazorpayOrderService,
  verifyPaymentService,
  getUserPurchasedGuides,
} from "./payment.service.js";
import Pdf from "../pdf/pdf.model.js";

/**
 * CREATE RAZORPAY ORDER
 */
export const createOrder = asyncHandler(async (req, res) => {
  const { guideId } = req.body;

  if (!guideId) {
    throw new ApiError("Guide ID is required", 400);
  }

  const guide = await Pdf.findById(guideId);
  if (!guide) {
    throw new ApiError("Guide not found", 404);
  }

  if (!guide.price || guide.price <= 0) {
    throw new ApiError("Invalid guide price", 400);
  }

  const amount = Number(guide.price);

  const order = await createRazorpayOrderService(amount);

  if (!order?.id) {
    throw new ApiError("Failed to create payment order", 500);
  }

  return success(
    res,
    { order, guideId, amount },
    "Order created successfully"
  );
});

/**
 * VERIFY PAYMENT & SAVE
 */
export const paymentVerification = asyncHandler(async (req, res) => {
  const {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    guideId,
  } = req.body;

  if (!req.user || !req.user._id) {
    throw new ApiError("Unauthorized", 401);
  }

  if (!guideId) {
    throw new ApiError("Guide ID is required", 400);
  }

  const guide = await Pdf.findById(guideId);
  if (!guide) {
    throw new ApiError("Guide not found", 404);
  }

  const payment = await verifyPaymentService({
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    userId: req.user._id,
    guideId,
    amount: guide.price,
  });

  if (!payment) {
    throw new ApiError("Payment verification failed", 400);
  }

  return success(res, { payment }, "Payment verified successfully");
});

/**
 * GET LOGGED-IN USER PURCHASES
 */
export const getMyPurchases = asyncHandler(async (req, res) => {
  if (!req.user || !req.user._id) {
    throw new ApiError("Unauthorized", 401);
  }

  const purchasedGuides = await getUserPurchasedGuides(req.user._id);

  return success(
    res,
    { guides: purchasedGuides },
    "Purchased guides fetched successfully"
  );
});
