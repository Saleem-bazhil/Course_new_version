import crypto from "crypto";
import dev from "../../config/payment.js";
import { instance } from "../../index.js";
import { Payment } from "./payment.model.js";
import Pdf from "../pdf/pdf.model.js";

export const createRazorpayOrderService = async (amount) => {
  try {
    // Validate amount
    if (!amount || isNaN(amount) || amount <= 0) {
      throw new Error("Invalid amount. Amount must be a positive number.");
    }

    // Check if Razorpay instance is initialized
    if (!instance) {
      throw new Error("Razorpay instance is not initialized. Please check your configuration.");
    }

    // Check if Razorpay keys are configured
    if (!instance.key_id || !instance.key_secret) {
      throw new Error("Razorpay credentials are not configured. Please set KEY_ID and KEY_SECRET in environment variables.");
    }

    const options = {
      amount: Math.round(Number(amount * 100)), // Convert to paise and round
      currency: "INR",
    };

    // Validate amount is at least 1 paise (0.01 INR)
    if (options.amount < 1) {
      throw new Error("Amount is too small. Minimum amount is 0.01 INR.");
    }

    const order = await instance.orders.create(options);
    
    if (!order) {
      throw new Error("Failed to create Razorpay order. No response received.");
    }

    if (!order.id) {
      throw new Error("Invalid response from Razorpay. Order ID is missing.");
    }

    return order;
  } catch (error) {
    // Handle Razorpay specific errors
    if (error.error) {
      const errorMessage = error.error.description || error.error.message || JSON.stringify(error.error);
      throw new Error(`Razorpay Error: ${errorMessage}`);
    }
    // Re-throw ApiError as-is
    if (error.constructor.name === 'ApiError') {
      throw error;
    }
    // Wrap other errors
    throw new Error(error.message || "Failed to create Razorpay order");
  }
};

export const verifyPaymentService = async ({
  razorpay_payment_id,
  razorpay_order_id,
  razorpay_signature,
  userId,
  guideId,
  amount,
}) => {
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", dev.KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return null;
  }

  // Ensure we know which user and which PDF this payment is for
  if (!userId || !guideId) {
    return null;
  }

  const pdfExists = await Pdf.findById(guideId);
  if (!pdfExists) {
    return null;
  }

  const payment = await Payment.create({
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    user: userId,
    guide: guideId,
    amount: amount,
  });

  return payment;
};

export const checkUserPurchase = async (userId, guideId) => {
  const purchase = await Payment.findOne({
    user: userId,
    guide: guideId,
  });
  return !!purchase;
};

export const getUserPurchasedGuides = async (userId) => {
  const purchases = await Payment.find({ user: userId })
    .populate("guide", "title description image price pdfUrl")
    .select("guide createdAt");
  return purchases.map((purchase) => purchase.guide);
};
