import bcrypt from "bcryptjs";
import { User } from "./user.model.js";
import ApiError from "../../utils/ApiError.js";
import jwt from "jsonwebtoken";

// create user 
export const createUserService = async (payload) => {
  const { name, email, password } = payload;

  const exists = await User.findOne({ email });
  if (exists) {
    throw new ApiError("User already exists", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return await User.create({
    name,
    email,
    password: hashedPassword,
  });
};

// get users for admin 
export const getAllUsersService = async () => {
  return await User.find().select("-password");
};

export const getUserByIdService = async (id) => {
  const user = await User.findById(id).select("-password");

  if (!user) {
    throw new ApiError("User not found", 404);
  }

  return user;
};

// generate jwt token
const generateToken = (user) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    }
  );
};

// login logic 
export const loginUserService = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError("Invalid email or password", 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new ApiError("Invalid email or password", 401);
  }

  const token = generateToken(user);

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

