const formatMongooseValidation = (error) =>
  Object.values(error.errors || {}).reduce((details, item) => {
    details[item.path] = item.message;
    return details;
  }, {});

const errorHandler = (error, _req, res, _next) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || "Something went wrong";
  let details = error.details || null;

  if (error.name === "CastError") {
    statusCode = 400;
    message = "Invalid resource id";
  }

  if (error.name === "ValidationError") {
    statusCode = 400;
    message = "Validation failed";
    details = formatMongooseValidation(error);
  }

  if (error.message === "This origin is not allowed by CORS") {
    statusCode = 403;
    message = "CORS policy blocked this request";
  }

  res.status(statusCode).json({
    message,
    ...(details ? { errors: details } : {})
  });
};

export default errorHandler;
