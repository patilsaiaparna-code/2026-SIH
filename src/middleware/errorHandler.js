function errorHandler(err, req, res, next) {
  console.error("API Error Stack:", err);
  const status = err.statusCode || 500;
  res.status(status).json({
    success: false,
    error: err.message || "Internal Server Error",
    timestamp: new Date().toISOString()
  });
}

module.exports = errorHandler;
