import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { User } from "../modules/users/user.model.js";

dotenv.config();

const createAdmin = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const name = "Saleem Admin";
  const email = "saleembazhil@gmail.com";
  const password = "saleembazhil@5050";

  const hashedPassword = await bcrypt.hash(password, 10);

  const adminExists = await User.findOne({ email });
  if (adminExists) {
    console.log(" Admin already exists");
    process.exit(0);
  }

  await User.create({
    name,
    email,
    password: hashedPassword,
    role: "ADMIN",
  });

  console.log(" Admin user created");
  console.log("Email:", email);
  console.log("Password:", password);

  process.exit(0);
};

createAdmin();
