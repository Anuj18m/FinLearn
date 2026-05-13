import React from 'react';
import { 
  Search, 
  Bell, 
  Flame, 
  Menu,
  ChevronDown,
  LogOut,
  Settings,
  User,
  Zap
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ toggleSidebar }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="h-14 border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-30 px-6">
      <div className="h-full flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <button 
            onClick={toggleSidebar}
            className="lg:hidden p-1.5 hover:bg-secondary rounded-md text-muted-foreground"
          >
            <Menu size={18} />
          </button>

          {/* Minimalist Search */}
          <div className="hidden sm:flex items-center max-w-[280px] w-full relative group">
            <Search className="absolute left-2.5 text-muted-foreground/50 group-focus-within:text-primary transition-colors" size={14} />
            <input 
              type="text" 
              placeholder="Search..."
              className="w-full bg-secondary/20 border border-transparent rounded-md py-1.5 pl-9 pr-4 text-xs focus:bg-secondary/40 focus:border-border/50 focus:ring-0 transition-all placeholder:text-muted-foreground/30"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Quick Stats Mini */}
          <div className="hidden md:flex items-center gap-4 px-4 py-1.5 bg-secondary/20 border border-border/30 rounded-full">
            <div className="flex items-center gap-1.5 text-orange-500">
              <Flame size={14} fill="currentColor" />
              <span className="text-[10px] font-black">12</span>
            </div>
            <div className="w-px h-3 bg-border/50" />
            <div className="flex items-center gap-1.5 text-primary">
              <Zap size={14} fill="currentColor" />
              <span className="text-[10px] font-black">84%</span>
            </div>
          </div>

          {/* Notifications */}
          <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
            <Bell size={18} />
          </button>

          {/* Profile Dropdown */}
          <div className="flex items-center gap-2 group cursor-pointer relative py-2">
            <div className="w-7 h-7 rounded-md bg-zinc-800 flex items-center justify-center text-[10px] font-black text-foreground border border-border/50 overflow-hidden">
               {user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <ChevronDown size={12} className="text-muted-foreground group-hover:text-foreground transition-all" />
            
            {/* Dropdown Menu - Minimalist */}
            <div className="absolute top-full right-0 mt-1 w-48 bg-card border border-border/50 rounded-lg shadow-xl py-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0.5 transition-all z-50">
              <div className="px-3 py-2 border-b border-border/50 mb-1">
                <p className="text-[10px] font-bold truncate text-foreground/80">{user?.name}</p>
                <p className="text-[9px] text-muted-foreground truncate">{user?.email}</p>
              </div>
              <button onClick={() => navigate('/profile')} className="w-full text-left px-3 py-1.5 text-[11px] hover:bg-secondary transition-colors flex items-center gap-2 font-medium">
                <User size={12} /> Profile
              </button>
              <button className="w-full text-left px-3 py-1.5 text-[11px] hover:bg-secondary transition-colors flex items-center gap-2 font-medium">
                <Settings size={12} /> Settings
              </button>
              <div className="border-t border-border/50 mt-1.5 pt-1.5">
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-1.5 text-[11px] hover:bg-destructive/10 transition-colors text-destructive flex items-center gap-2 font-bold"
                >
                  <LogOut size={12} /> Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
