import ApiError from '../utils/ApiError.js';

/**
 * @description Centralized error handling middleware
 */
const errorHandler = (err, req, res, next) => {
  let error = err;

  // If the error is not an instance of our custom ApiError, wrap it
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || (error.name === 'ValidationError' ? 400 : 500);
    const message = error.message || 'Internal Server Error';
    error = new ApiError(statusCode, message, false, err.stack);
  }

  const { statusCode, message } = error;

  // Build response object
  const response = {
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
  };

  // Logging
  if (statusCode === 500 || !error.isOperational) {
    console.error('🔥 [CRITICAL ERROR]:', err);
  } else {
    console.warn(`⚠️ [API ERROR]: ${statusCode} - ${message}`);
  }

  res.status(statusCode).json(response);
};

export default errorHandler;
