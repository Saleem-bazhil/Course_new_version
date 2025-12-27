import "dotenv/config";
import Razorpay from "razorpay";
import dev from "./config/payment.js";
import connectDB from "./config/database.js";
import app from "./app.js";

connectDB();

const port = 5050;

// Validate Razorpay configuration
if (!dev.KEY_ID || !dev.KEY_SECRET) {
  console.warn("⚠️  Warning: Razorpay KEY_ID or KEY_SECRET is missing. Payment functionality may not work.");
}

export const instance = new Razorpay({
  key_id: dev.KEY_ID,
  key_secret: dev.KEY_SECRET,
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
  if (dev.KEY_ID && dev.KEY_SECRET) {
    console.log("✅ Razorpay configured");
  } else {
    console.log("❌ Razorpay not configured - check environment variables");
  }
});
