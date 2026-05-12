import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchModulesStart, fetchModulesSuccess, fetchModulesFailure } from '../store/moduleSlice';
import { fetchProgressSuccess, fetchStatsSuccess } from '../store/progressSlice';
import { moduleService, progressService } from '../services/apiService';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { modules, loading } = useSelector((state) => state.modules);
  const { stats } = useSelector((state) => state.progress);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      dispatch(fetchModulesStart());
      const modulesData = await moduleService.getAllModules();
      dispatch(fetchModulesSuccess(modulesData));

      const progressData = await progressService.getUserProgress();
      dispatch(fetchProgressSuccess(progressData));

      const statsData = await progressService.getUserStats();
      dispatch(fetchStatsSuccess(statsData));
    } catch (error) {
      dispatch(fetchModulesFailure(error.message));
    }
  };

  const getModuleProgress = (moduleId) => {
    const moduleProgress = stats?.activity?.find(a => a.moduleId === moduleId);
    return moduleProgress ? 100 : 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 rounded-full bg-slate-200 mb-4"></div>
          <div className="h-4 w-32 bg-slate-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-1">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-slate-500">
            Monitor your progress and continue your financial literacy journey.
          </p>
        </div>

        {/* Stats Section */}
        {stats?.overview && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="text-sm font-medium text-slate-500 mb-1">Course Progress</div>
              <div className="text-3xl font-bold text-slate-900">
                {stats.overview.completionPercentage}%
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="text-sm font-medium text-slate-500 mb-1">Modules Completed</div>
              <div className="text-3xl font-bold text-slate-900">
                {stats.overview.completedModules}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="text-sm font-medium text-slate-500 mb-1">Average Score</div>
              <div className="text-3xl font-bold text-slate-900">
                {stats.overview.averageScore}%
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="text-sm font-medium text-slate-500 mb-1">Quizzes Taken</div>
              <div className="text-3xl font-bold text-slate-900">
                {stats.overview.totalQuizzesTaken}
              </div>
            </div>
          </div>
        )}

        {/* Modules Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Learning Modules</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => (
              <div
                key={module._id}
                className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:border-primary transition cursor-pointer"
                onClick={() => navigate(`/module/${module.slug}`)}
              >
                <div className="bg-gradient-to-r from-primary to-secondary p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{module.title}</h3>
                  <p className="text-cyan-50 text-sm">{module.duration}</p>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{module.description}</p>
                  <button className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-secondary transition">
                    Start Learning
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
