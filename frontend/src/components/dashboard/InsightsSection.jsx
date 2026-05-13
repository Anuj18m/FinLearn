import React from 'react';
import { 
  Sparkles, 
  ChevronRight, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  BookOpen,
  Target,
  Flame,
  Clock,
  BrainCircuit
} from 'lucide-react';

const iconMap = {
  Sparkles,
  BookOpen,
  Target,
  Flame,
  Clock
};

const trendMap = {
  improving: { icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  declining: { icon: TrendingDown, color: 'text-destructive', bg: 'bg-destructive/10' },
  neutral: { icon: Minus, color: 'text-muted-foreground', bg: 'bg-muted' }
};

const priorityMap = {
  high: 'border-l-destructive',
  medium: 'border-l-amber-500',
  low: 'border-l-primary'
};

const InsightsSection = ({ recommendations = [], aiScore = {} }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-xl text-primary">
            <BrainCircuit size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tight">AI Learning Insights</h2>
            <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Personalized Strategy</p>
          </div>
        </div>
        
        {/* Mock AI Confidence Meter */}
        <div className="hidden md:flex items-center gap-4 px-4 py-2 bg-secondary/30 rounded-2xl border border-border">
          <div className="text-right">
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Confidence Score</p>
            <p className="text-lg font-black leading-none">{aiScore.confidence}%</p>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-muted flex items-center justify-center relative">
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="24"
                cy="24"
                r="20"
                stroke="currentColor"
                strokeWidth="4"
                fill="transparent"
                className="text-primary/20"
              />
              <circle
                cx="24"
                cy="24"
                r="20"
                stroke="currentColor"
                strokeWidth="4"
                fill="transparent"
                strokeDasharray="125.6"
                strokeDashoffset={125.6 - (125.6 * aiScore.confidence) / 100}
                className="text-primary"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendations.map((rec) => {
          const Icon = iconMap[rec.icon] || Sparkles;
          const trend = trendMap[rec.trend] || trendMap.neutral;
          const priorityClass = priorityMap[rec.priority] || priorityMap.low;

          return (
            <div 
              key={rec.id}
              className={`bg-card rounded-2xl border border-border border-l-4 ${priorityClass} p-5 hover:shadow-xl hover:shadow-primary/5 transition-all group cursor-pointer active:scale-[0.98]`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg bg-secondary text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all`}>
                  <Icon size={20} />
                </div>
                <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full ${trend.bg} ${trend.color} text-[10px] font-black uppercase tracking-tighter`}>
                  <trend.icon size={10} />
                  {rec.trend}
                </div>
              </div>
              
              <h3 className="font-bold mb-1 group-hover:text-primary transition-colors">{rec.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">{rec.description}</p>
              
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/50">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Priority: {rec.priority}</span>
                <ChevronRight size={16} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InsightsSection;
