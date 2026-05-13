import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    setIsSidebarOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground flex selection:bg-primary/20">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:pl-56 min-h-screen transition-all duration-300">
        <Navbar toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-x-hidden">
          <div className="max-w-7xl mx-auto py-8">
            <Outlet />
          </div>
        </main>

        {/* Minimalist Footer */}
        <footer className="px-8 py-10 border-t border-border/30">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
               <div className="w-5 h-5 bg-muted rounded flex items-center justify-center">
                  <span className="text-[10px] font-black text-muted-foreground">F</span>
               </div>
               <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">FinLearn Workspace</p>
            </div>
            <div className="flex items-center gap-8 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms</a>
              <a href="#" className="hover:text-primary transition-colors">Support</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AppLayout;
