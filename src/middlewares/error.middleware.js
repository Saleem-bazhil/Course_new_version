import ApiError from "../utils/ApiError.js";

const errorMiddleware = (err, req, res, next) => {
  const statusCode =
    err instanceof ApiError ? err.statusCode : err.statusCode || 500;

  const message = err.message || "Internal Server Error";

  // eslint-disable-next-line no-console
  console.error(err);

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export default errorMiddleware;
