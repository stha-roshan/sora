const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (res.headersSent) return next(err);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  if (err.code === "P2002") {
    statusCode = 409;
    message = "A record with this value already exists";
  } else if (err.code === "P2025") {
    statusCode = 404;
    message = "Record not found";
  }

  if (statusCode === 500 && process.env.NODE_ENV === "production") {
    message = "Internal Server Error";
  }

  const body = { success: false, message, errors: err.errors || [] };

  if (process.env.NODE_ENV !== "production") {
    body.stack = err.stack;
  }

  res.status(statusCode).json(body);
};

export default errorHandler;
