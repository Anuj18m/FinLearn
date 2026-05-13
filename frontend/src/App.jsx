import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './store/authSlice';
import { authService } from './services/apiService';

import PublicNavbar from './components/PublicNavbar';
import AppLayout from './components/layout/AppLayout';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Module from './pages/Module';
import Quiz from './pages/Quiz';
import Progress from './pages/Progress';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ModuleManager from './pages/admin/ModuleManager';
import QuizManager from './pages/admin/QuizManager';
import UserManager from './pages/admin/UserManager';

function App() {
  const dispatch = useDispatch();
  const { token, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          const user = await authService.getCurrentUser();
          if (user) {
            dispatch(setUser(user));
          } else {
            dispatch({ type: 'auth/logout' }); // Clear token if user is unexpectedly empty
          }
        } catch (error) {
          dispatch({ type: 'auth/logout' }); // Clear invalid token
        }
      }
    };

    checkAuth();
  }, [token, dispatch]);

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />}
        />
        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Register />}
        />

        {/* Authenticated Routes with Modern AppLayout */}
        <Route
          element={
            <PrivateRoute>
              <AppLayout />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/module/:slug" element={<Module />} />
          <Route path="/quiz/:moduleId" element={<Quiz />} />
          <Route path="/progress" element={<Progress />} />
          
          {/* Admin Routes - Double Protected */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Outlet />
              </AdminRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="modules" element={<ModuleManager />} />
            <Route path="quizzes" element={<QuizManager />} />
            <Route path="users" element={<UserManager />} />
          </Route>
          
          {/* Placeholders for sidebar items */}
          <Route path="/learn" element={<div className="p-10 animate-fade-in"><h1 className="text-3xl font-black mb-4">Learning Path</h1><div className="p-10 border border-dashed border-border rounded-3xl text-center text-muted-foreground">Comprehensive roadmap coming soon.</div></div>} />
          <Route path="/quizzes" element={<div className="p-10 animate-fade-in"><h1 className="text-3xl font-black mb-4">Your Quizzes</h1><div className="p-10 border border-dashed border-border rounded-3xl text-center text-muted-foreground">Self-assessment center coming soon.</div></div>} />
          <Route path="/recommendations" element={<div className="p-10 animate-fade-in"><h1 className="text-3xl font-black mb-4">AI Recommendations</h1><div className="p-10 border border-dashed border-border rounded-3xl text-center text-muted-foreground">Personalized insights coming soon.</div></div>} />
          <Route path="/profile" element={<div className="p-10 animate-fade-in"><h1 className="text-3xl font-black mb-4">Profile Settings</h1><div className="p-10 border border-dashed border-border rounded-3xl text-center text-muted-foreground">Account management coming soon.</div></div>} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
