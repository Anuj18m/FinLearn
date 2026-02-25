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
    // This would check if user has completed this module
    return 0; // Simplified for now
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600">
            Continue your financial literacy journey
          </p>
        </div>

        {/* Stats Section */}
        {stats && (
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <div className="text-3xl font-bold text-primary mb-2">
                {stats.totalModulesCompleted}
              </div>
              <div className="text-gray-600">Modules Completed</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <div className="text-3xl font-bold text-primary mb-2">
                {stats.totalQuizzesTaken}
              </div>
              <div className="text-gray-600">Quizzes Taken</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <div className="text-3xl font-bold text-primary mb-2">
                {stats.averageScore}%
              </div>
              <div className="text-gray-600">Average Score</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <div className="text-3xl font-bold text-accent mb-2">
                {stats.passedQuizzes}
              </div>
              <div className="text-gray-600">Quizzes Passed</div>
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
