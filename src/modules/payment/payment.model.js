import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    razorpay_payment_id: {
      type: String,
      required: true,
      unique: true,
    },

    razorpay_order_id: {
      type: String,
      required: true,
    },

    razorpay_signature: {
      type: String,
      required: true, 
    },

    // user who made the payment
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // purchased PDF / Guide
    pdf: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pdf",
      required: true,
      index: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      default: "INR",
    },

    status: {
      type: String,
      enum: ["created", "paid", "failed"],
      default: "paid",
    },
  },
  { timestamps: true }
);

export const Payment = mongoose.model("Payment", paymentSchema);
