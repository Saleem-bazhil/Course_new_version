import jwt from "jsonwebtoken";
import { User } from "../modules/users/user.model.js";

export const optionalAuthenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return next();
    }

    if (!process.env.JWT_SECRET) {
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (user) {
      req.user = user;
    }
    
    next();
  } catch (error) {
    // If token is invalid, just continue without user
    next();
  }
};

