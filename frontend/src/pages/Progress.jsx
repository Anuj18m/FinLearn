import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProgressStart, fetchProgressSuccess, fetchProgressFailure } from '../store/progressSlice';
import { progressService } from '../services/apiService';
import { generateCertificate, formatDate } from '../utils/helpers';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { 
  Trophy, 
  Download, 
  Activity, 
  Award, 
  TrendingUp, 
  ChevronRight,
  ArrowUpRight,
  Target,
  Sparkles
} from 'lucide-react';

const Progress = () => {
  const dispatch = useDispatch();
  const { progress, loading } = useSelector((state) => state.progress);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      dispatch(fetchProgressStart());
      const data = await progressService.getUserProgress();
      dispatch(fetchProgressSuccess(data));
    } catch (error) {
      dispatch(fetchProgressFailure(error.message));
    }
  };

  const handleDownloadCertificate = (item) => {
    if (item.passed) {
      generateCertificate(
        user.name,
        item.moduleId.title,
        item.score,
        formatDate(item.completedAt)
      );
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-12 px-6 space-y-12 animate-pulse">
        <div className="h-10 w-48 bg-secondary/50 rounded-lg" />
        <div className="h-64 bg-secondary/30 rounded-2xl" />
        <div className="space-y-4">
          {[1, 2, 3].map(i => <div key={i} className="h-16 bg-secondary/20 rounded-xl" />)}
        </div>
      </div>
    );
  }

  const safeProgress = progress || [];
  
  // Prepare chart data
  const chartData = safeProgress.map(item => ({
    name: item.moduleId?.title?.substring(0, 10) || 'Module',
    score: item.score,
    passed: item.passed
  }));

  const passedModules = safeProgress.filter(p => p.passed);
  const avgScore = safeProgress.length > 0 
    ? Math.round(safeProgress.reduce((acc, curr) => acc + curr.score, 0) / safeProgress.length)
    : 0;

  return (
    <div className="max-w-6xl mx-auto py-12 px-6 animate-fade-in space-y-16 pb-24">
      {/* Header & Overview */}
      <section className="space-y-8">
        <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-widest">
                <Activity size={12} />
                Analytics Workspace
            </div>
            <h1 className="text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Progress Intelligence
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                Analyzing your growth trajectory across the financial literacy landscape.
            </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
                { label: 'Modules Cleared', value: passedModules.length, icon: Award, color: 'text-primary' },
                { label: 'Average Accuracy', value: `${avgScore}%`, icon: Target, color: 'text-blue-500' },
                { label: 'Current Momentum', value: 'Positive', icon: TrendingUp, color: 'text-emerald-500' },
            ].map((stat, i) => (
                <div key={i} className="bg-secondary/10 border border-border/50 rounded-2xl p-6 flex flex-col justify-between h-32">
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">{stat.label}</span>
                        <stat.icon size={16} className={stat.color} />
                    </div>
                    <p className="text-3xl font-black text-foreground">{stat.value}</p>
                </div>
            ))}
        </div>
      </section>

      {safeProgress.length === 0 ? (
        <section className="py-24 text-center space-y-6">
            <div className="w-16 h-16 bg-secondary/50 rounded-full flex items-center justify-center mx-auto text-muted-foreground">
                <Activity size={32} />
            </div>
            <div className="space-y-2">
                <h3 className="text-xl font-bold">No telemetry data found</h3>
                <p className="text-sm text-muted-foreground max-w-xs mx-auto">Complete your first module assessment to unlock the analytics engine.</p>
            </div>
        </section>
      ) : (
        <>
          {/* Performance Visualization */}
          <section className="space-y-8">
             <h2 className="text-xs font-black uppercase tracking-widest text-muted-foreground/60 border-l-2 border-primary pl-3">Assessment Distribution</h2>
             <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-sm">
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis 
                        dataKey="name" 
                        stroke="#52525b" 
                        fontSize={10} 
                        fontWeight="bold"
                        tickLine={false} 
                        axisLine={false} 
                        dy={10}
                      />
                      <YAxis 
                        stroke="#52525b" 
                        fontSize={10} 
                        fontWeight="bold"
                        tickLine={false} 
                        axisLine={false} 
                        tickFormatter={(v) => `${v}%`}
                        dx={-10}
                      />
                      <Tooltip 
                        cursor={{fill: 'rgba(255,255,255,0.02)'}}
                        contentStyle={{ 
                          backgroundColor: '#0a0a0a', 
                          borderColor: 'rgba(255,255,255,0.1)', 
                          borderRadius: '12px',
                          fontSize: '11px',
                          fontWeight: 'bold'
                        }}
                      />
                      <Bar dataKey="score" radius={[4, 4, 0, 0]} barSize={32}>
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.score >= 80 ? 'hsl(var(--primary))' : '#3f3f46'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
             </div>
          </section>

          {/* Activity Ledger */}
          <section className="space-y-8">
             <div className="flex items-center justify-between">
                <h2 className="text-xs font-black uppercase tracking-widest text-muted-foreground/60 border-l-2 border-primary pl-3">Activity Ledger</h2>
                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{safeProgress.length} Records</div>
             </div>
             
             <div className="bg-card border border-border/50 rounded-3xl overflow-hidden shadow-sm">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-border/50 bg-secondary/20">
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40">Resource</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40">Intelligence</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40">Timestamp</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 text-right">Result</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/30">
                        {safeProgress.map((item) => (
                            <tr key={item._id} className="hover:bg-secondary/10 transition-all group">
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-secondary/50 flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                                            <Trophy size={14} />
                                        </div>
                                        <span className="text-xs font-bold text-foreground/90">{item.moduleId?.title}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-2">
                                        <div className="w-24 h-1.5 bg-secondary rounded-full overflow-hidden">
                                            <div className={`h-full transition-all ${item.passed ? 'bg-primary' : 'bg-muted-foreground/30'}`} style={{ width: `${item.score}%` }} />
                                        </div>
                                        <span className="text-[10px] font-black">{item.score}%</span>
                                    </div>
                                </td>
                                <td className="px-8 py-6 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                    {formatDate(item.completedAt)}
                                </td>
                                <td className="px-8 py-6 text-right">
                                    {item.passed ? (
                                        <button
                                            onClick={() => handleDownloadCertificate(item)}
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest rounded-full hover:brightness-110 transition-all shadow-lg shadow-primary/10"
                                        >
                                            <Download size={12} />
                                            Certificate
                                        </button>
                                    ) : (
                                        <span className="text-[10px] font-black text-muted-foreground/30 uppercase tracking-[0.2em]">Restricted</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
             </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Progress;
