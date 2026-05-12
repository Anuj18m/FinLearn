import express from 'express';
import * as quizController from '../controllers/quiz.controller.js';
import * as quizValidation from '../validations/quiz.validation.js';
import validate from '../middleware/validate.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

/**
 * @route   GET /api/quizzes/module/:moduleId
 * @desc    Get sanitized quiz for a student
 * @access  Private
 */
router.get('/module/:moduleId', auth, validate(quizValidation.getQuiz), quizController.getQuiz);

/**
 * @route   POST /api/quizzes/submit
 * @desc    Submit quiz answers and get results
 * @access  Private
 */
router.post('/submit', auth, validate(quizValidation.submitQuiz), quizController.submitQuiz);

export default router;
