import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/apiService';
import { 
  Users, 
  BookOpen, 
  CheckCircle, 
  Activity,
  ArrowUpRight,
  ExternalLink,
  Shield,
  Zap,
  Plus,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await adminService.getPlatformStats();
        setStats(data);
      } catch (error) {
        // Silent failure, UI will show skeleton or error state if implemented
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-12 px-6 space-y-12 animate-pulse">
        <div className="h-10 w-48 bg-secondary/50 rounded-lg" />
        <div className="grid grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => <div key={i} className="h-24 bg-secondary/30 rounded-2xl" />)}
        </div>
        <div className="h-64 bg-secondary/20 rounded-2xl" />
      </div>
    );
  }

  const safeStats = stats || {};
  const overview = safeStats.overview || { totalUsers: 0, avgScore: 0, totalAttempts: 0, totalModules: 0 };
  const recentActivity = safeStats.activity || [];

  const statCards = [
    { label: 'Total Students', value: overview.totalUsers || 0, icon: Users, color: 'text-blue-500' },
    { label: 'Avg Accuracy', value: `${overview.avgScore || 0}%`, icon: Zap, color: 'text-primary' },
    { label: 'Assessments', value: overview.totalQuizzesTaken || overview.totalAttempts || 0, icon: CheckCircle, color: 'text-emerald-500' },
    { label: 'Modules', value: overview.totalModules || 0, icon: BookOpen, color: 'text-purple-500' },
  ];

  return (
    <div className="max-w-6xl mx-auto py-12 px-6 animate-fade-in space-y-16 pb-24">
      {/* Header */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-widest">
          <Shield size={12} />
          Administrator Workspace
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Platform Intelligence
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
                Overseeing student engagement and curriculum performance across the FinLearn ecosystem.
            </p>
          </div>
          <div className="flex items-center gap-3">
             <button onClick={() => navigate('/admin/modules')} className="btn-primary flex items-center gap-2 rounded-full">
                <Plus size={16} />
                New Module
             </button>
          </div>
        </div>
      </section>

      {/* Stats Cluster */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, i) => (
          <div key={i} className="bg-secondary/10 border border-border/50 rounded-2xl p-6 group hover:bg-secondary/20 transition-all">
            <div className="flex items-center justify-between mb-4">
                <div className={`w-8 h-8 rounded-lg bg-secondary/50 flex items-center justify-center ${stat.color}`}>
                    <stat.icon size={16} />
                </div>
                <ArrowUpRight size={14} className="text-muted-foreground opacity-30 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 mb-1">{stat.label}</p>
            <p className="text-3xl font-black text-foreground">{stat.value}</p>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Activity Ledger */}
        <div className="lg:col-span-8 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-black uppercase tracking-widest text-muted-foreground/60 border-l-2 border-primary pl-3">Recent Submissions</h2>
            <button onClick={() => navigate('/admin/users')} className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-1 group">
                Full Directory <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <div className="bg-card border border-border/50 rounded-3xl overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-secondary/20 border-b border-border/50">
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">Student</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 text-center">Score</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 text-right">Resource</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {(recentActivity || []).map((activity) => (
                  <tr key={activity._id} className="hover:bg-secondary/10 transition-all group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-[10px] font-black text-muted-foreground border border-border/50">
                          {activity.userId?.name?.[0]}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-foreground/90">{activity.userId?.name}</p>
                          <p className="text-[10px] text-muted-foreground truncate max-w-[150px]">{activity.userId?.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className={`text-[10px] font-black uppercase tracking-widest ${activity.passed ? 'text-primary' : 'text-destructive'}`}>
                        {activity.score}%
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                       <p className="text-[10px] font-bold text-muted-foreground uppercase">{activity.moduleId?.title}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Control Shortcuts */}
        <div className="lg:col-span-4 space-y-12">
          <section className="space-y-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground/60">Quick Controls</h3>
            <div className="space-y-3">
              {[
                { label: 'Manage Modules', path: '/admin/modules', icon: BookOpen },
                { label: 'Assessment Engine', path: '/admin/quizzes', icon: CheckCircle },
                { label: 'User Directory', path: '/admin/users', icon: Users },
              ].map((action, i) => (
                <button 
                    key={i} 
                    onClick={() => navigate(action.path)}
                    className="w-full flex items-center justify-between p-4 bg-secondary/10 border border-border/30 rounded-xl hover:border-primary/40 hover:bg-secondary/20 transition-all group"
                >
                    <div className="flex items-center gap-3">
                        <action.icon size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="text-xs font-bold text-foreground/80">{action.label}</span>
                    </div>
                    <ArrowRight size={14} className="text-muted-foreground/20 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </section>

          {/* Growth Insight */}
          <div className="bg-primary/5 border border-primary/20 rounded-3xl p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-[0.05] group-hover:scale-110 transition-transform">
                <Activity size={100} />
            </div>
            <div className="relative z-10 space-y-6">
                <p className="text-[10px] font-black uppercase tracking-widest text-primary">Monthly Trajectory</p>
                <div className="flex items-center gap-3">
                    <span className="text-4xl font-black text-foreground">+14%</span>
                    <TrendingUp size={24} className="text-primary" />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                    User engagement has seen a significant uptick in module completions this quarter.
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
