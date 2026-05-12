import Progress from '../models/Progress.js';
import Module from '../models/Module.js';
import ApiError from '../utils/ApiError.js';

/**
 * Get detailed stats and completion data for a student
 */
export const getUserStats = async (userId) => {
  // 1. Get total modules count
  const totalModulesCount = await Module.countDocuments();
  
  // 2. Get all progress records for the user
  const userProgress = await Progress.find({ userId });
  
  const completedModules = userProgress.filter(p => p.passed).length;
  const totalQuizzesTaken = userProgress.length;
  
  // 3. Calculate metrics
  const averageScore = userProgress.length > 0 
    ? Math.round(userProgress.reduce((sum, p) => sum + p.score, 0) / userProgress.length)
    : 0;

  const completionPercentage = totalModulesCount > 0 
    ? Math.round((completedModules / totalModulesCount) * 100) 
    : 0;

  // 4. Get recent activity
  const recentActivity = await Progress.find({ userId })
    .populate('moduleId', 'title slug')
    .sort({ completedAt: -1 })
    .limit(5);

  return {
    overview: {
      completionPercentage,
      completedModules,
      totalModules: totalModulesCount,
      averageScore,
      totalQuizzesTaken
    },
    activity: recentActivity.map(activity => ({
      id: activity._id,
      moduleTitle: activity.moduleId?.title,
      moduleSlug: activity.moduleId?.slug,
      score: activity.score,
      status: activity.passed ? 'PASSED' : 'FAILED',
      date: activity.completedAt
    }))
  };
};

/**
 * Get all progress records for a user
 */
export const getAllUserProgress = async (userId) => {
  return await Progress.find({ userId })
    .populate('moduleId', 'title slug')
    .sort({ completedAt: -1 });
};

/**
 * Get progress for a specific module
 */
export const getModuleProgress = async (userId, moduleId) => {
  const progress = await Progress.findOne({ userId, moduleId })
    .populate('moduleId', 'title slug');
    
  if (!progress) {
    throw new ApiError(404, 'No progress record found for this module');
  }
  
  return progress;
};
