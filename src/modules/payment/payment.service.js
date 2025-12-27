import crypto from "crypto";
import dev from "../../config/payment.js";
import { instance } from "../../index.js";
import { Payment } from "./payment.model.js";

export const createRazorpayOrderService = async (amount) => {
  const options = {
    amount: Number(amount * 100),
    currency: "INR",
  };

  const order = await instance.orders.create(options);
  return order;
};

export const verifyPaymentService = async ({
  razorpay_payment_id,
  razorpay_order_id,
  razorpay_signature,
}) => {
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", dev.KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return null;
  }

  const payment = await Payment.create({
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
  });

  return payment;
};
