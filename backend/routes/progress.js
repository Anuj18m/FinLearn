import express from 'express';
import Progress from '../models/Progress.js';

const router = express.Router();

// @route   GET /api/progress
// @desc    Get user's progress for all modules
// @access  Private
router.get('/', async (req, res) => {
  try {
    const progress = await Progress.find({ userId: req.userId })
      .populate('moduleId', 'title slug')
      .populate('quizId', 'title')
      .sort({ completedAt: -1 });

    res.json(progress);
  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/progress/module/:moduleId
// @desc    Get user's progress for specific module
// @access  Private
router.get('/module/:moduleId', async (req, res) => {
  try {
    const progress = await Progress.findOne({
      userId: req.userId,
      moduleId: req.params.moduleId
    })
      .populate('moduleId', 'title slug')
      .populate('quizId', 'title');

    if (!progress) {
      return res.status(404).json({ message: 'No progress found for this module' });
    }

    res.json(progress);
  } catch (error) {
    console.error('Get module progress error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/progress/stats
// @desc    Get user's overall statistics
// @access  Private
router.get('/stats', async (req, res) => {
  try {
    const allProgress = await Progress.find({ userId: req.userId });

    const stats = {
      totalModulesCompleted: allProgress.filter(p => p.passed).length,
      totalQuizzesTaken: allProgress.length,
      averageScore: allProgress.length > 0 
        ? Math.round(allProgress.reduce((sum, p) => sum + p.score, 0) / allProgress.length)
        : 0,
      passedQuizzes: allProgress.filter(p => p.passed).length,
      failedQuizzes: allProgress.filter(p => !p.passed).length
    };

    res.json(stats);
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
