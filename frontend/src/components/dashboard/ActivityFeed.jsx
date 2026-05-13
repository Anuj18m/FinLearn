import React from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ArrowRight,
  Trophy
} from 'lucide-react';
import { formatDate } from '../../utils/helpers';

const ActivityFeed = ({ progress = [] }) => {
  const recentActivity = progress.slice(0, 5);

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden h-full flex flex-col shadow-sm">
      <div className="p-6 border-b border-border flex items-center justify-between bg-secondary/10">
        <h3 className="font-black tracking-tight text-lg">Recent Activity</h3>
        <Clock size={18} className="text-muted-foreground" />
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {recentActivity.length === 0 ? (
          <div className="p-10 text-center text-muted-foreground italic text-sm">
            No recent activity found.
          </div>
        ) : (
          <div className="divide-y divide-border">
            {recentActivity.map((item, i) => (
              <div key={i} className="p-5 hover:bg-secondary/20 transition-all group flex items-start gap-4">
                <div className={`mt-1 p-2 rounded-xl ${item.passed ? 'bg-emerald-500/10 text-emerald-500' : 'bg-destructive/10 text-destructive'}`}>
                  {item.passed ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-sm font-bold truncate group-hover:text-primary transition-colors">
                      {item.moduleId?.title || 'Quiz Attempt'}
                    </p>
                    <span className="text-[10px] font-black text-muted-foreground uppercase whitespace-nowrap">
                      {formatDate(item.completedAt)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${item.passed ? 'bg-emerald-500/10 text-emerald-500' : 'bg-destructive/10 text-destructive'}`}>
                        Score: {item.score}%
                      </span>
                      {item.score >= 90 && (
                        <Trophy size={14} className="text-amber-500 animate-bounce" />
                      )}
                    </div>
                    <ArrowRight size={14} className="text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {recentActivity.length > 0 && (
        <button className="p-4 bg-secondary/30 hover:bg-secondary/50 text-center text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-all border-t border-border">
          View Full History
        </button>
      )}
    </div>
  );
};

export default ActivityFeed;
