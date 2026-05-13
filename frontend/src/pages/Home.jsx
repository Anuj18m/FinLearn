import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, GraduationCap, Play, Sparkles, ShieldCheck } from 'lucide-react';
import PublicNavbar from '../components/PublicNavbar';

const Home = () => {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/20">
      <PublicNavbar />
      
      {/* Hero Section */}
      <main className="container mx-auto px-6 py-24 lg:py-32">
        <div className="flex flex-col items-center text-center space-y-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary/30 border border-border/50 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-primary">
            <Sparkles size={12} className="animate-pulse" />
            Empowering Financial Literacy
          </div>
          
          <div className="max-w-4xl space-y-6">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] text-balance">
              Master your <span className="text-muted-foreground/40">financial</span> future.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              An intelligent learning workspace designed to transform complex market concepts into actionable mastery.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/register"
              className="btn-primary py-4 px-10 rounded-full text-base flex items-center justify-center gap-3 shadow-2xl shadow-primary/20 group"
            >
              Get Started
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/login"
              className="btn-secondary py-4 px-10 rounded-full text-base flex items-center justify-center bg-transparent border-border/50 hover:bg-secondary/50"
            >
              Sign in
            </Link>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="mt-40 grid md:grid-cols-3 gap-6">
          {[
            { 
              title: 'Structured Mastery', 
              desc: 'Deep dives into Stocks, Mutual Funds, Bonds, F&O, and IPOs.', 
              icon: BookOpen,
              color: 'text-primary'
            },
            { 
              title: 'Visual Logic', 
              desc: 'Curated cinematic learning modules for maximum retention.', 
              icon: Play,
              color: 'text-blue-500'
            },
            { 
              title: 'Smart Assessment', 
              desc: 'Adaptive testing to validate and reinforce your knowledge.', 
              icon: GraduationCap,
              color: 'text-emerald-500'
            }
          ].map((feature, i) => (
            <div key={i} className="group p-8 rounded-3xl bg-secondary/10 border border-border/30 hover:border-primary/20 transition-all duration-500">
              <div className={`w-12 h-12 rounded-2xl bg-secondary/50 flex items-center justify-center mb-8 border border-border/50 group-hover:scale-110 transition-transform ${feature.color}`}>
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-black mb-3">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Social Proof / Trust */}
        <div className="mt-32 pt-20 border-t border-border/30 flex flex-col items-center gap-12">
            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40">
                <ShieldCheck size={14} />
                Trusted by thousands of learners
            </div>
            <div className="flex flex-wrap justify-center gap-x-16 gap-y-8 grayscale opacity-30 invert">
                <span className="text-2xl font-black tracking-tighter">FINANCE</span>
                <span className="text-2xl font-black tracking-tighter">MARKETS</span>
                <span className="text-2xl font-black tracking-tighter">STOCKS</span>
                <span className="text-2xl font-black tracking-tighter">WEALTH</span>
            </div>
        </div>
      </main>

      {/* Minimal Landing Footer */}
      <footer className="py-20 border-t border-border/30 bg-secondary/5">
        <div className="container mx-auto px-6 text-center space-y-6">
            <div className="flex items-center justify-center gap-2">
                <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                    <span className="text-[10px] font-black text-primary-foreground">F</span>
                </div>
                <span className="font-bold text-sm tracking-tighter">FinLearn Pro</span>
            </div>
            <p className="text-[10px] font-bold text-muted-foreground/30 uppercase tracking-[0.4em]">Designed for focused financial mastery</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
