import asyncHandler from '../utils/asyncHandler.js';
import * as quizService from '../services/quiz.service.js';

/**
 * @desc    Get quiz for a module
 * @route   GET /api/quizzes/module/:moduleId
 * @access  Private
 */
export const getQuiz = asyncHandler(async (req, res) => {
  const quiz = await quizService.getQuizForModule(req.params.moduleId);
  res.json({
    success: true,
    data: quiz
  });
});

/**
 * @desc    Submit quiz answers
 * @route   POST /api/quizzes/submit
 * @access  Private
 */
export const submitQuiz = asyncHandler(async (req, res) => {
  const result = await quizService.submitQuizAnswers(req.userId, req.body);
  res.json({
    success: true,
    data: result
  });
});
