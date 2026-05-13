import express from 'express';
import * as quizController from '../controllers/quiz.controller.js';
import * as quizValidation from '../validations/quiz.validation.js';
import validate from '../middleware/validate.js';
import { auth } from '../middleware/auth.js';
import authorize from '../middleware/authorize.js';

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

/**
 * Admin Routes
 */
router.get('/', auth, authorize('admin'), quizController.getAllQuizzes);
router.post('/', auth, authorize('admin'), validate(quizValidation.createQuiz), quizController.createQuiz);
router.put('/:id', auth, authorize('admin'), validate(quizValidation.updateQuiz), quizController.updateQuiz);
router.delete('/:id', auth, authorize('admin'), quizController.deleteQuiz);

export default router;
