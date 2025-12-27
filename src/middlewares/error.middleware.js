import ApiError from "../utils/ApiError.js";

export default (err, req, res, next) => {
  // If error is an ApiError, use its status code, otherwise default to 500
  const statusCode = err instanceof ApiError ? err.statusCode : 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
