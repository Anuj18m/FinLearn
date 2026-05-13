import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  LayoutDashboard, 
  BookOpen, 
  GraduationCap, 
  Activity, 
  Sparkles, 
  User,
  X,
  CreditCard,
  Shield,
  Users,
  Settings,
  Plus
} from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user?.role === 'admin';

  const menuItems = [
    { name: 'Home', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Library', icon: BookOpen, path: '/learn' },
    { name: 'Assessments', icon: GraduationCap, path: '/quizzes' },
    { name: 'Analytics', icon: Activity, path: '/progress' },
  ];

  const adminItems = [
    { name: 'Platform', icon: Shield, path: '/admin/dashboard' },
    { name: 'Modules', icon: Plus, path: '/admin/modules' },
    { name: 'Quizzes', icon: Settings, path: '/admin/quizzes' },
    { name: 'Students', icon: Users, path: '/admin/users' },
  ];

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      toggleSidebar();
    }
  };

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40 lg:hidden transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}

      <aside className={`
        fixed top-0 left-0 h-full w-56 bg-background border-r border-border/50 z-50
        transition-all duration-300 ease-in-out lg:translate-x-0
        ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full py-6">
          {/* Logo Section */}
          <div className="px-6 mb-8 flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center gap-2 group">
              <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center transition-transform group-hover:rotate-12">
                <span className="text-primary-foreground font-black text-xs">F</span>
              </div>
              <span className="font-bold text-sm tracking-tight text-foreground/90">
                FinLearn
              </span>
            </Link>
            <button onClick={toggleSidebar} className="lg:hidden p-1.5 text-muted-foreground hover:text-foreground">
              <X size={16} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 space-y-0.5">
            <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40">Workspace</div>
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={handleLinkClick}
                  className={`
                    flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 group relative
                    ${isActive 
                      ? 'bg-secondary text-primary font-medium' 
                      : 'text-muted-foreground hover:bg-secondary/40 hover:text-foreground'}
                  `}
                >
                  <Icon size={16} className={isActive ? 'text-primary' : 'group-hover:text-foreground transition-colors'} />
                  <span className="text-xs">{item.name}</span>
                  {isActive && (
                    <div className="absolute right-2 w-1 h-1 rounded-full bg-primary" />
                  )}
                </Link>
              );
            })}

            {isAdmin && (
              <div className="mt-8 pt-6 border-t border-border/50">
                <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40">Admin</div>
                {adminItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  const Icon = item.icon;
                  
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={handleLinkClick}
                      className={`
                        flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 group relative
                        ${isActive 
                          ? 'bg-secondary text-primary font-medium' 
                          : 'text-muted-foreground hover:bg-secondary/40 hover:text-foreground'}
                      `}
                    >
                      <Icon size={16} className={isActive ? 'text-primary' : 'group-hover:text-foreground transition-colors'} />
                      <span className="text-xs">{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </nav>

          {/* User Section Mini */}
          <div className="px-4 mt-auto">
            <div className="p-3 rounded-lg hover:bg-secondary/40 transition-all cursor-pointer group flex items-center gap-3">
              <div className="w-8 h-8 rounded-md bg-secondary flex items-center justify-center border border-border/50">
                <User size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium truncate text-foreground/80">{user?.name || 'Student'}</p>
                <p className="text-[10px] text-muted-foreground font-bold tracking-tighter uppercase">{user?.role || 'Basic'}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
