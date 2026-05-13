import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

const PublicNavbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="h-20 border-b border-border/30 bg-background/50 backdrop-blur-md sticky top-0 z-50 px-6 lg:px-12">
      <div className="container mx-auto h-full flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 bg-primary rounded flex items-center justify-center transition-transform group-hover:scale-105">
            <span className="text-primary-foreground font-black text-xs">F</span>
          </div>
          <span className="text-lg font-black tracking-tight text-foreground">
            FinLearn
          </span>
        </Link>

        <div className="flex items-center gap-8">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
                Workspace
              </Link>
              <div className="flex items-center gap-4 pl-4 border-l border-border/50">
                 <button
                    onClick={handleLogout}
                    className="text-xs font-bold uppercase tracking-widest text-destructive hover:brightness-110 transition-all"
                  >
                    Logout
                  </button>
                  <Link to="/dashboard" className="w-8 h-8 rounded-md bg-secondary flex items-center justify-center border border-border/50 text-[10px] font-black">
                     {user?.name?.[0]?.toUpperCase()}
                  </Link>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
                Sign in
              </Link>
              <Link
                to="/register"
                className="btn-primary py-2 px-6 rounded-full text-xs"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default PublicNavbar;
