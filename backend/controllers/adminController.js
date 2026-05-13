import User from '../models/User.js';
import Module from '../models/Module.js';
import Quiz from '../models/Quiz.js';
import Progress from '../models/Progress.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';

/**
 * @description Get overall platform analytics for admin
 */
export const getPlatformStats = asyncHandler(async (req, res) => {
  const [
    totalUsers,
    totalModules,
    totalQuizzes,
    totalAttempts,
    recentActivity
  ] = await Promise.all([
    User.countDocuments({ role: 'user' }),
    Module.countDocuments(),
    Quiz.countDocuments(),
    Progress.countDocuments(),
    Progress.find()
      .populate('userId', 'name email')
      .populate('moduleId', 'title')
      .sort({ completedAt: -1 })
      .limit(10)
  ]);

  // Calculate average platform score
  const scoreStats = await Progress.aggregate([
    { $group: { _id: null, avgScore: { $avg: '$score' } } }
  ]);
  const avgScore = scoreStats.length > 0 ? scoreStats[0].avgScore : 0;

  // Module completion counts
  const moduleCompletions = await Progress.aggregate([
    { $match: { passed: true } },
    { $group: { _id: '$moduleId', count: { $sum: 1 } } }
  ]);

  res.json(new ApiResponse(200, {
    overview: {
      totalUsers,
      totalModules,
      totalQuizzes,
      totalAttempts,
      avgScore: Math.round(avgScore)
    },
    recentActivity,
    moduleCompletions
  }, 'Platform stats retrieved successfully'));
});

/**
 * @description Get all students with their summary stats
 */
export const getAllStudents = asyncHandler(async (req, res) => {
  const students = await User.find({ role: 'user' }, 'name email createdAt');
  
  const studentStats = await Progress.aggregate([
    {
      $group: {
        _id: '$userId',
        completedModules: {
          $sum: { $cond: [{ $eq: ['$passed', true] }, 1, 0] }
        },
        avgScore: { $avg: '$score' },
        lastActive: { $max: '$completedAt' }
      }
    }
  ]);

  const statsMap = studentStats.reduce((acc, stat) => {
    acc[stat._id.toString()] = stat;
    return acc;
  }, {});

  const studentData = students.map((student) => {
    const stat = statsMap[student._id.toString()] || {
      completedModules: 0,
      avgScore: 0,
      lastActive: null
    };

    return {
      _id: student._id,
      name: student.name,
      email: student.email,
      joinedAt: student.createdAt,
      completedModules: stat.completedModules,
      avgScore: Math.round(stat.avgScore),
      lastActive: stat.lastActive
    };
  });

  res.json(new ApiResponse(200, studentData, 'Students retrieved successfully'));
});
