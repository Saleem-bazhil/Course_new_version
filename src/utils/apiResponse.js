exports.success = (res, data, message = "Success") => {
  res.status(200).json({
    success: true,
    message,
    count: Array.isArray(data) ? data.length : undefined,
    data,
  });
};

exports.error = (res, message = "Server Error", code = 500) => {
  res.status(code).json({
    success: false,
    message,
  });
};
