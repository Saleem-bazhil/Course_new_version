import asyncHandler from "../../utils/asyncHandler.js";
import { success } from "../../utils/apiResponse.js";
import ApiError from "../../utils/ApiError.js";
import {
  createRazorpayOrderService,
  verifyPaymentService,
  getUserPurchasedGuides,
} from "./payment.service.js";
import Pdf from "../pdf/pdf.model.js";
import {Course} from "../course/course.model.js";

/**
 * CREATE RAZORPAY ORDER (PDF / COURSE)
 */
export const createOrder = asyncHandler(async (req, res) => {
  const { itemId, itemType } = req.body;

  if (!itemId || !itemType) {
    throw new ApiError("Item ID and Item Type are required", 400);
  }

  let item;

  if (itemType === "Pdf") {
    item = await Pdf.findById(itemId);
  } else if (itemType === "Course") {
    item = await Course.findById(itemId);
  } else {
    throw new ApiError("Invalid item type", 400);
  }

  if (!item) {
    throw new ApiError("Item not found", 404);
  }

  if (!item.price || item.price <= 0) {
    throw new ApiError("Invalid item price", 400);
  }

  const amount = Number(item.price);

  const order = await createRazorpayOrderService(amount);

  if (!order?.id) {
    throw new ApiError("Failed to create payment order", 500);
  }

  return success(
    res,
    { order, itemId, itemType, amount },
    "Order created successfully"
  );
});

/**
 * VERIFY PAYMENT & SAVE (PDF / COURSE)
 */
export const paymentVerification = asyncHandler(async (req, res) => {
  const {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    itemId,
    itemType,
  } = req.body;

  if (!req.user || !req.user._id) {
    throw new ApiError("Unauthorized", 401);
  }

  if (!itemId || !itemType) {
    throw new ApiError("Item ID and Item Type are required", 400);
  }

  let item;

  if (itemType === "Pdf") {
    item = await Pdf.findById(itemId);
  } else if (itemType === "Course") {
    item = await Course.findById(itemId);
  }

  if (!item) {
    throw new ApiError("Item not found", 404);
  }

  const payment = await verifyPaymentService({
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    userId: req.user._id,
    itemId,
    itemType,
    amount: item.price,
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

  const payments = await getUserPurchasedGuides(req.user._id);

  const guides = payments
    .filter(p => p.item) // ✅ safety
    .map(p => ({
      ...p.item.toObject(),
      isPurchased: true,
    }));

  return success(
    res,
    { guides },
    "Purchased guides fetched successfully"
  );
});
