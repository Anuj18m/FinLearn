/**
 * FinLearn V2 Smart Learning Recommendation Engine
 * Analyzes user progress and quiz performance to generate adaptive insights.
 */

export const generateRecommendations = (progress = [], modules = [], stats = {}) => {
  if (!progress || progress.length === 0) {
    return [
      {
        id: 'start-learning',
        type: 'action',
        title: 'Begin Your Journey',
        description: 'Complete your first module to unlock personalized AI insights.',
        priority: 'high',
        icon: 'Sparkles',
        trend: 'neutral'
      }
    ];
  }

  const recommendations = [];
  
  // 1. Analyze Weakest Topic
  const moduleScores = {};
  progress.forEach(attempt => {
    const moduleId = attempt.moduleId?._id || attempt.moduleId;
    if (!moduleScores[moduleId]) {
      moduleScores[moduleId] = { scores: [], title: attempt.moduleId?.title || 'Unknown Module' };
    }
    moduleScores[moduleId].scores.push(attempt.score);
  });

  const sortedByScore = Object.entries(moduleScores).map(([id, data]) => ({
    id,
    avg: data.scores.reduce((a, b) => a + b, 0) / data.scores.length,
    title: data.title
  })).sort((a, b) => a.avg - b.avg);

  if (sortedByScore.length > 0) {
    const weakest = sortedByScore[0];
    if (weakest.avg < 70) {
      recommendations.push({
        id: 'weak-topic',
        type: 'revision',
        title: `Revise ${weakest.title}`,
        description: `Your average score in ${weakest.title} is ${Math.round(weakest.avg)}%. A quick review could boost your performance.`,
        priority: 'high',
        icon: 'BookOpen',
        trend: 'declining'
      });
    }
  }

  // 2. Next Recommended Module
  const completedIds = new Set(progress.filter(p => p.passed).map(p => p.moduleId?._id || p.moduleId));
  const nextModule = modules.find(m => !completedIds.has(m._id));
  
  if (nextModule) {
    recommendations.push({
      id: 'next-module',
      type: 'next',
      title: 'Recommended Next',
      description: `Ready for a new challenge? Dive into ${nextModule.title} to continue your path.`,
      priority: 'medium',
      icon: 'Target',
      trend: 'neutral'
    });
  }

  // 3. Learning Momentum
  const lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - 7);
  const recentAttempts = progress.filter(p => new Date(p.completedAt) > lastWeek).length;

  if (recentAttempts >= 3) {
    recommendations.push({
      id: 'momentum-high',
      type: 'praise',
      title: 'Excellent Momentum!',
      description: `You've completed ${recentAttempts} quizzes this week. You're in the top 10% of active learners.`,
      priority: 'low',
      icon: 'Flame',
      trend: 'improving'
    });
  } else if (recentAttempts === 0) {
    recommendations.push({
      id: 'momentum-low',
      type: 'nudge',
      title: 'Consistency is Key',
      description: "It's been a while since your last quiz. Try a quick 5-minute lesson today.",
      priority: 'medium',
      icon: 'Clock',
      trend: 'declining'
    });
  }

  return recommendations;
};

export const calculateAIScore = (progress = [], stats = {}) => {
  const completion = stats?.overview?.completionPercentage || 0;
  const avgScore = stats?.overview?.averageScore || 0;
  
  // Mock logic for Confidence, Momentum, Engagement
  return {
    confidence: Math.round((avgScore * 0.7) + (completion * 0.3)),
    momentum: progress.length > 5 ? 85 : progress.length * 15,
    engagement: stats?.overview?.totalQuizzesTaken > 10 ? 92 : 70
  };
};

export const getInsights = (progress = [], stats = {}) => {
  if (!progress || progress.length === 0) return null;

  const moduleStats = {};
  progress.forEach(p => {
    const title = p.moduleId?.title || 'Unknown';
    if (!moduleStats[title]) moduleStats[title] = { total: 0, sum: 0 };
    moduleStats[title].total++;
    moduleStats[title].sum += p.score;
  });

  const topics = Object.entries(moduleStats).map(([title, s]) => ({
    title,
    avg: s.sum / s.total
  })).sort((a, b) => b.avg - a.avg);

  return {
    strongest: topics[0]?.title || 'None yet',
    weakest: topics[topics.length - 1]?.title || 'None yet',
    accuracyTrend: progress.length > 1 ? (progress[progress.length - 1].score >= progress[progress.length - 2].score ? 'improving' : 'declining') : 'neutral'
  };
};
