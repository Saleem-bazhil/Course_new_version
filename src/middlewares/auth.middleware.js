import jwt from "jsonwebtoken";
<<<<<<< HEAD
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

=======
import ApiError from "../utils/ApiError.js";

const auth = (req, res, next) => {
  try {
    const header = req.headers.authorization || req.headers.Authorization;

    if (!header || typeof header !== "string" || !header.startsWith("Bearer ")) {
      throw new ApiError("Unauthorized", 401);
    }

    const token = header.split(" ")[1];

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
      return next(new ApiError("Unauthorized", 401));
    }
    return next(err);
  }
};

export default auth;


>>>>>>> recover-admin
