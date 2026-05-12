import asyncHandler from '../utils/asyncHandler.js';
import * as progressService from '../services/progress.service.js';

/**
 * @desc    Get user statistics and activity snapshot
 * @route   GET /api/progress/stats
 * @access  Private
 */
export const getStats = asyncHandler(async (req, res) => {
  const stats = await progressService.getUserStats(req.userId);
  res.json({
    success: true,
    data: stats
  });
});

/**
 * @desc    Get all progress records for user
 * @route   GET /api/progress
 * @access  Private
 */
export const getProgress = asyncHandler(async (req, res) => {
  const progress = await progressService.getAllUserProgress(req.userId);
  res.json({
    success: true,
    data: progress
  });
});

/**
 * @desc    Get progress for specific module
 * @route   GET /api/progress/module/:moduleId
 * @access  Private
 */
export const getModuleProgress = asyncHandler(async (req, res) => {
  const progress = await progressService.getModuleProgress(req.userId, req.params.moduleId);
  res.json({
    success: true,
    data: progress
  });
});
