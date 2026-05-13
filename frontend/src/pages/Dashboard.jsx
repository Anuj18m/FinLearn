import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchModulesStart, fetchModulesSuccess, fetchModulesFailure } from '../store/moduleSlice';
import { fetchProgressSuccess, fetchStatsSuccess } from '../store/progressSlice';
import { moduleService, progressService } from '../services/apiService';
import { 
  ArrowRight,
  Clock,
  Play,
  TrendingUp,
  Sparkles,
  Zap,
  Target,
  BarChart3,
  Book,
  GraduationCap
} from 'lucide-react';

import { generateRecommendations, calculateAIScore, getInsights } from '../utils/recommendationEngine';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { modules, loading: modulesLoading } = useSelector((state) => state.modules);
  const { progress, stats, loading: progressLoading } = useSelector((state) => state.progress);
  const { user } = useSelector((state) => state.auth);

  const loading = modulesLoading || progressLoading;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      dispatch(fetchModulesStart());
      dispatch({ type: 'progress/fetchProgressStart' }); // Dispatch directly or import it if needed

      const [modulesData, progressData, statsData] = await Promise.all([
        moduleService.getAllModules(),
        progressService.getUserProgress(),
        progressService.getUserStats()
      ]);

      dispatch(fetchModulesSuccess(modulesData));
      dispatch(fetchProgressSuccess(progressData));
      dispatch(fetchStatsSuccess(statsData));
    } catch (error) {
      dispatch(fetchModulesFailure(error.message));
      dispatch({ type: 'progress/fetchProgressFailure', payload: error.message });
    }
  };

  const { recommendations, aiScore, insights } = useMemo(() => {
    return {
      recommendations: generateRecommendations(safeProgress, safeModules, stats) || [],
      aiScore: calculateAIScore(safeProgress, stats) || { momentum: 0, confidence: 0, engagement: 0 },
      insights: getInsights(safeProgress, stats) || { strongest: 'N/A', weakest: 'N/A', accuracyTrend: 'neutral' }
    };
  }, [safeProgress, safeModules, stats]);

  if (loading) {
    return (
      <div className="py-12 space-y-12 animate-pulse">
        <div className="h-32 w-1/2 bg-secondary/50 rounded-2xl" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 h-64 bg-secondary/30 rounded-2xl" />
          <div className="h-64 bg-secondary/30 rounded-2xl" />
        </div>
      </div>
    );
  }

  const safeModules = modules || [];
  const currentModule = safeModules[0]; 
  const safeProgress = progress || [];

  return (
    <div className="max-w-6xl mx-auto py-12 px-6 lg:px-0 animate-fade-in space-y-16">
      {/* Header Section - Minimalist Hero */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-widest">
          <Sparkles size={12} />
          Intelligent Learning
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl lg:text-5xl font-black mb-4 leading-tight">
              Welcome back, {user?.name?.split(' ')[0]}.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              You've completed <span className="text-foreground font-semibold">{stats?.overview?.completionPercentage || 0}%</span> of your financial mastery track. 
              Today's focus: <span className="text-primary font-semibold">{insights?.weakest || 'Risk Management'}</span>.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">AI Momentum</p>
              <p className="text-2xl font-black text-foreground">{aiScore.momentum}%</p>
            </div>
            <div className="w-12 h-12 rounded-full border-2 border-primary/20 flex items-center justify-center p-1">
              <div className="w-full h-full rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <TrendingUp size={18} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left Column: Learning Journey */}
        <div className="lg:col-span-8 space-y-12">
          {/* Active Module Focus */}
          <div className="group relative bg-secondary/20 border border-border/50 rounded-2xl p-8 hover:bg-secondary/30 transition-all cursor-pointer overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
              <Book size={160} />
            </div>
            <div className="relative z-10 space-y-6">
              <div className="inline-flex px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded uppercase">Current Focus</div>
              <div>
                <h2 className="text-2xl font-bold mb-2">{currentModule?.title || 'Financial Fundamentals'}</h2>
                <p className="text-sm text-muted-foreground line-clamp-2 max-w-lg">{currentModule?.description}</p>
              </div>
              <div className="flex items-center gap-6">
                <button 
                  onClick={() => navigate(`/module/${currentModule?.slug}`)}
                  className="btn-primary flex items-center gap-2"
                >
                  <Play size={14} fill="currentColor" />
                  Continue Learning
                </button>
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                  <Clock size={14} />
                  {currentModule?.duration || '15 mins'} remaining
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations / Next Steps */}
          <section className="space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60 border-l-2 border-primary pl-3">Smart Recommendations</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recommendations.slice(0, 2).map((rec, i) => (
                <div key={i} className="card-premium flex flex-col justify-between group">
                  <div>
                    <div className={`w-8 h-8 rounded-md mb-4 flex items-center justify-center ${
                      rec.priority === 'High' ? 'bg-rose-500/10 text-rose-500' : 'bg-primary/10 text-primary'
                    }`}>
                      <Zap size={16} />
                    </div>
                    <h4 className="text-sm font-bold mb-1">{rec.title}</h4>
                    <p className="text-[11px] text-muted-foreground">{rec.description}</p>
                  </div>
                  <button className="mt-6 text-[10px] font-black uppercase text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                    Action <ArrowRight size={12} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Insights & Stats */}
        <div className="lg:col-span-4 space-y-12">
          {/* Quick Stats Minimalist */}
          <section className="space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">Insights</h3>
            <div className="space-y-4">
              {[
                { label: 'Overall Mastery', value: `${stats?.overview?.completionPercentage || 0}%`, icon: Target },
                { label: 'Avg Assessment', value: `${stats?.overview?.averageScore || 0}%`, icon: GraduationCap },
                { label: 'Platform Rank', value: 'Top 12%', icon: BarChart3 },
              ].map((stat, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-secondary/10 border border-border/30 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-secondary/50 rounded-md text-muted-foreground">
                      <stat.icon size={14} />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">{stat.label}</span>
                  </div>
                  <span className="text-sm font-black">{stat.value}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Activity Section Mini */}
          <section className="space-y-6">
             <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">Recent Growth</h3>
             <div className="relative pl-4 space-y-6 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-px before:bg-border">
                {safeProgress.slice(0, 3).map((item, i) => (
                  <div key={i} className="relative space-y-1">
                    <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-primary border-4 border-background" />
                    <p className="text-xs font-bold text-foreground/80">{item.moduleId?.title}</p>
                    <p className="text-[10px] text-muted-foreground uppercase font-black">{item.score}% Accuracy</p>
                  </div>
                ))}
             </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
