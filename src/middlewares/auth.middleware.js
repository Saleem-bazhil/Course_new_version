import jwt from "jsonwebtoken";
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


