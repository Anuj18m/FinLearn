import asyncHandler from '../utils/asyncHandler.js';
import * as quizService from '../services/quiz.service.js';
import ApiResponse from '../utils/ApiResponse.js';

/**
 * @desc    Get quiz for a module
 * @route   GET /api/quizzes/module/:moduleId
 * @access  Private
 */
export const getQuiz = asyncHandler(async (req, res) => {
  const quiz = await quizService.getQuizForModule(req.params.moduleId);
  res.json(new ApiResponse(200, quiz, 'Quiz retrieved successfully'));
});

/**
 * @desc    Submit quiz answers
 * @route   POST /api/quizzes/submit
 * @access  Private
 */
export const submitQuiz = asyncHandler(async (req, res) => {
  const result = await quizService.submitQuizAnswers(req.userId, req.body);
  res.json(new ApiResponse(200, result, 'Quiz submitted successfully'));
});

/**
 * @desc    Get all quizzes (Admin only)
 */
export const getAllQuizzes = asyncHandler(async (req, res) => {
  const quizzes = await quizService.getAllQuizzes();
  res.json(new ApiResponse(200, quizzes, 'All quizzes retrieved successfully'));
});

/**
 * @desc    Create a new quiz (Admin only)
 */
export const createQuiz = asyncHandler(async (req, res) => {
  const quiz = await quizService.createQuiz(req.body);
  res.status(201).json(new ApiResponse(201, quiz, 'Quiz created successfully'));
});

/**
 * @desc    Update a quiz (Admin only)
 */
export const updateQuiz = asyncHandler(async (req, res) => {
  const quiz = await quizService.updateQuiz(req.params.id, req.body);
  res.json(new ApiResponse(200, quiz, 'Quiz updated successfully'));
});

/**
 * @desc    Delete a quiz (Admin only)
 */
export const deleteQuiz = asyncHandler(async (req, res) => {
  await quizService.deleteQuiz(req.params.id);
  res.json(new ApiResponse(200, null, 'Quiz deleted successfully'));
});
