import { body, param } from 'express-validator';

/**
 * @description Validation for Quiz retrieval
 */
export const getQuiz = [
  param('moduleId').isMongoId().withMessage('Invalid Module ID'),
];

/**
 * @description Validation for Quiz submission
 */
export const submitQuiz = [
  body('quizId').isMongoId().withMessage('Invalid Quiz ID'),
  body('moduleId').isMongoId().withMessage('Invalid Module ID'),
  body('answers')
    .isArray()
    .withMessage('Answers must be an array')
    .notEmpty()
    .withMessage('Answers cannot be empty'),
  body('answers.*').isInt({ min: 0 }).withMessage('Each answer must be a valid option index'),
];
