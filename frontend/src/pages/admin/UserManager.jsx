import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/apiService';
import { 
  Users, 
  Search, 
  Filter, 
  Mail, 
  Calendar,
  Trophy,
  BookOpen,
  ArrowRight,
  Sparkles,
  User as UserIcon,
  ShieldCheck
} from 'lucide-react';

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await adminService.getAllUsers();
        setUsers(data);
      } catch (error) {
        // Silent failure
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = (users || []).filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="max-w-6xl mx-auto py-12 px-6 space-y-12 animate-pulse">
        <div className="h-10 w-48 bg-secondary/50 rounded-lg" />
        <div className="grid grid-cols-3 gap-6">
            {[1, 2, 3].map(i => <div key={i} className="h-64 bg-secondary/20 rounded-2xl" />)}
        </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto py-12 px-6 animate-fade-in space-y-12 pb-24">
      {/* Header & Search */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-widest">
                <Sparkles size={12} />
                Student Registry
            </div>
            <h1 className="text-4xl font-black tracking-tight">User Directory</h1>
            <p className="text-muted-foreground text-sm font-medium">Monitor learner engagement and identify top platform performers.</p>
        </div>
        
        <div className="flex items-center gap-2">
            <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/30 group-focus-within:text-primary transition-colors" size={16} />
                <input 
                    type="text" 
                    placeholder="Search intelligence..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-secondary/10 border border-border/50 rounded-full py-2.5 pl-10 pr-6 text-xs font-bold focus:bg-secondary/20 focus:border-primary/50 transition-all w-full md:w-64 placeholder:text-muted-foreground/20"
                />
            </div>
            <button className="w-10 h-10 flex items-center justify-center bg-secondary/20 hover:bg-secondary/40 border border-border/50 rounded-full transition-all text-muted-foreground">
                <Filter size={16} />
            </button>
        </div>
      </section>

      {/* User Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <div key={user._id} className="bg-card border border-border/50 rounded-3xl overflow-hidden hover:bg-secondary/10 transition-all group flex flex-col shadow-sm">
            <div className="p-8 border-b border-border/30 relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-sm font-black text-muted-foreground border border-border/50 shadow-sm group-hover:text-primary transition-colors">
                  {user.name?.[0]?.toUpperCase()}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-black truncate text-foreground/90">{user.name}</h3>
                    {user.role === 'admin' && <ShieldCheck size={14} className="text-primary" />}
                  </div>
                  <p className="text-[10px] text-muted-foreground font-medium truncate">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="space-y-1">
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/40">Registered</p>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold">
                    <Calendar size={12} className="text-primary/60" />
                    {new Date(user.joinedAt || Date.now()).toLocaleDateString()}
                  </div>
                </div>
                <div className="w-px h-6 bg-border/50" />
                <div className="space-y-1">
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/40">Status</p>
                  <div className="flex items-center gap-1.5 text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                    Live
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 flex-1 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-secondary/10 border border-border/30 rounded-2xl">
                  <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 mb-2">Curriculum</p>
                  <div className="flex items-center gap-2">
                    <BookOpen size={14} className="text-primary/60" />
                    <span className="text-xl font-black">{user.completedModules || 0}</span>
                  </div>
                </div>
                <div className="p-4 bg-secondary/10 border border-border/30 rounded-2xl">
                  <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 mb-2">Mastery</p>
                  <div className="flex items-center gap-2">
                    <Trophy size={14} className="text-primary" />
                    <span className="text-xl font-black">{user.avgScore || 0}%</span>
                  </div>
                </div>
              </div>

              <button className="w-full flex items-center justify-between p-3.5 bg-secondary/20 hover:bg-primary hover:text-primary-foreground rounded-2xl transition-all group/btn border border-border/30">
                <span className="text-[10px] font-black uppercase tracking-widest">View Intelligence Report</span>
                <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-32 space-y-6 bg-secondary/5 rounded-[3rem] border border-dashed border-border/50">
          <div className="w-16 h-16 bg-secondary/50 rounded-full flex items-center justify-center mx-auto text-muted-foreground">
            <UserIcon size={32} />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold">No intelligence match</h3>
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-black">Search yielded 0 results</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManager;
