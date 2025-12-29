import asyncHandler from "../../utils/asyncHandler.js";
import { success } from "../../utils/apiResponse.js";
import ApiError from "../../utils/ApiError.js";
import {
  createRazorpayOrderService,
  verifyPaymentService,
  getUserPurchasedGuides,
} from "./payment.service.js";
import Pdf from "../pdf/pdf.model.js";

export const createOrder = asyncHandler(async (req, res) => {
  const { guideId } = req.body;
  
  if (!guideId) {
    throw new ApiError("Guide ID is required", 400);
  }

  const guide = await Pdf.findById(guideId);
  if (!guide) {
    throw new ApiError("Guide not found", 404);
  }

  // Validate guide price
  if (!guide.price || isNaN(guide.price) || guide.price <= 0) {
    throw new ApiError("Invalid guide price. Please contact support.", 400);
  }

  const amount = Number(guide.price);
  
  try {
    const order = await createRazorpayOrderService(amount);
    
    if (!order || !order.id) {
      throw new ApiError("Failed to create payment order. Please try again.", 500);
    }
    
    return success( res, { order, guideId, amount }, "Order created successfully" );
  } catch (error) {
    // Convert service errors to ApiError
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(error.message || "Failed to create payment order", 500);
  }
});

export const paymentVerification = asyncHandler(async (req, res) => {
<<<<<<< HEAD
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature, guideId } = req.body;
  
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
    guideId: guideId,
    amount: guide.price,
  });
=======
  const { guideId } = req.body;
>>>>>>> recover-admin

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

export const getMyPurchases = asyncHandler(async (req, res) => {
  const purchasedGuides = await getUserPurchasedGuides(req.user._id);
  return success( res, { guides: purchasedGuides }, "Purchased guides fetched successfully" );
});
