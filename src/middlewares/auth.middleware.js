import jwt from "jsonwebtoken";
import { User } from "../modules/users/user.model.js";
import ApiError from "../utils/ApiError.js";

export const authenticate = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      throw new ApiError("Authentication required. Please provide a valid token in the Authorization header.", 401);
    }

    // Handle both "Bearer <token>" and just "<token>" formats
    const token = authHeader.startsWith("Bearer ") 
      ? authHeader.replace("Bearer ", "").trim()
      : authHeader.trim();

    if (!token) {
      throw new ApiError("Authentication required. Please provide a valid token in the Authorization header.", 401);
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      throw new ApiError("User not found. Please login again.", 401);
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return next(new ApiError("Invalid or expired token. Please login again.", 401));
    }
    if (error instanceof jwt.TokenExpiredError) {
      return next(new ApiError("Token has expired. Please login again.", 401));
    }
    next(error);
  }
};

