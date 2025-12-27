import "dotenv/config";
import Razorpay from "razorpay";
import dev from "./config/payment.js";
import connectDB from "./config/database.js";
import app from "./app.js";

connectDB();

const port = 3000;

export const instance = new Razorpay({
  key_id: dev.KEY_ID,
  key_secret: dev.KEY_SECRET,
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
