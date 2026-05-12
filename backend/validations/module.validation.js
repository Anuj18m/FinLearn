import { body, param } from 'express-validator';

/**
 * @description Validation rules for Creating a module
 */
export const createModule = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('slug').trim().notEmpty().withMessage('Slug is required').isLowercase().withMessage('Slug must be lowercase'),
  body('description').notEmpty().withMessage('Description is required'),
  body('content').notEmpty().withMessage('Content is required'),
  body('videoUrl').isURL().withMessage('Please provide a valid video URL'),
  body('order').isInt({ min: 0 }).withMessage('Order must be a non-negative integer'),
  body('duration').optional().isString(),
];

/**
 * @description Validation rules for Updating a module
 */
export const updateModule = [
  param('id').isMongoId().withMessage('Invalid module ID'),
  body('title').optional().trim().notEmpty(),
  body('videoUrl').optional().isURL(),
  body('order').optional().isInt({ min: 0 }),
];
