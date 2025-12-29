import ApiError from "../utils/ApiError.js";

export default (err, req, res, next) => {
<<<<<<< HEAD
  // If error is an ApiError, use its status code, otherwise default to 500
  const statusCode = err instanceof ApiError ? err.statusCode : 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
=======
  const statusCode = err.statusCode || 500;

  // eslint-disable-next-line no-console
  console.error(err);

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal server error",
>>>>>>> recover-admin
  });
};
