import ApiError from '../utils/ApiError.js';

/**
 * @description Middleware to restrict access to specific roles
 * @param {...string} roles - Allowed roles (e.g., 'admin', 'user')
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.userRole || !roles.includes(req.userRole)) {
      return next(new ApiError(403, 'Access denied: You do not have permission to perform this action'));
    }
    next();
  };
};

export default authorize;
