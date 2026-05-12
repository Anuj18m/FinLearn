import { validationResult } from 'express-validator';
import ApiError from '../utils/ApiError.js';

/**
 * @description Middleware to validate request against a schema
 */
const validate = (validations) => {
  return async (req, res, next) => {
    // Execute all validations
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    // Format errors into a readable string
    const extractedErrors = errors.array().map(err => `${err.path}: ${err.msg}`).join(', ');
    
    // Throw a 400 Bad Request error
    next(new ApiError(400, `Validation failed: ${extractedErrors}`));
  };
};

export default validate;
