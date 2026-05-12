import express from 'express';
import * as progressController from '../controllers/progress.controller.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Apply auth middleware to all progress routes
router.use(auth);

/**
 * @route   GET /api/progress/stats
 * @desc    Get user's overall statistics and activity
 * @access  Private
 */
router.get('/stats', progressController.getStats);

/**
 * @route   GET /api/progress
 * @desc    Get all progress records for user
 * @access  Private
 */
router.get('/', progressController.getProgress);

/**
 * @route   GET /api/progress/module/:moduleId
 * @desc    Get progress for specific module
 * @access  Private
 */
router.get('/module/:moduleId', progressController.getModuleProgress);

export default router;
