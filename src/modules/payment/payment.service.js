import crypto from "crypto";
import dev from "../../config/payment.js";
import { instance } from "../../index.js";
import { Payment } from "./payment.model.js";
import Pdf from "../pdf/pdf.model.js";
import {Course} from "../course/course.model.js";

/**
 * CREATE RAZORPAY ORDER
 */
export const createRazorpayOrderService = async (amount) => {
  if (!amount || isNaN(amount) || amount <= 0) {
    throw new Error("Invalid amount");
  }

  const options = {
    amount: Math.round(amount * 100),
    currency: "INR",
  };

  return await instance.orders.create(options);
};

/**
 * VERIFY PAYMENT & SAVE (PDF / COURSE)
 */
export const verifyPaymentService = async ({
  razorpay_payment_id,
  razorpay_order_id,
  razorpay_signature,
  userId,
  itemId,
  itemType,
  amount,
}) => {
  const body = `${razorpay_order_id}|${razorpay_payment_id}`;

  const expectedSignature = crypto
    .createHmac("sha256", dev.KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return null;
  }

  // Prevent duplicate purchase
  const alreadyPurchased = await Payment.findOne({
    user: userId,
    item: itemId,
    itemType,
  });

  if (alreadyPurchased) {
    return alreadyPurchased;
  }

  // Validate item existence
  let itemExists;
  if (itemType === "Pdf") itemExists = await Pdf.findById(itemId);
  if (itemType === "Course") itemExists = await Course.findById(itemId);

  if (!itemExists) {
    return null;
  }

  const payment = await Payment.create({
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    user: userId,
    item: itemId,
    itemType,
    amount,
  });

  return payment;
};

/**
 * CHECK IF USER PURCHASED ITEM
 */
export const checkUserPurchase = async (userId, itemId, itemType) => {
  return !!(await Payment.findOne({
    user: userId,
    item: itemId,
    itemType: "Pdf",
  }));
};

/**
 * GET ALL USER PURCHASES (PDF + COURSE)
 */
export const getUserPurchasedGuides = async (userId) => {
  return await Payment.find({
    user: userId,
    itemType: "Pdf",
    status: "paid",
  }).populate("item"); // ✅ REQUIRED
};
