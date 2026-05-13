import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentModule } from '../store/moduleSlice';
import { moduleService } from '../services/apiService';
import { getVideoEmbedUrl } from '../utils/helpers';
import { 
  ArrowLeft, 
  Play, 
  BookOpen, 
  GraduationCap, 
  Clock, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

const Module = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentModule } = useSelector((state) => state.modules);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchModule();
    window.scrollTo(0, 0);
  }, [slug]);

  const fetchModule = async () => {
    try {
      const data = await moduleService.getModuleBySlug(slug);
      dispatch(setCurrentModule(data));
      setLoading(false);
    } catch (error) {
      // Silent failure
      setLoading(false);
    }
  };

  const handleStartQuiz = () => {
    navigate(`/quiz/${currentModule._id}`);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-6 space-y-12 animate-pulse">
        <div className="h-8 w-48 bg-secondary/50 rounded-md" />
        <div className="space-y-4">
          <div className="h-12 w-3/4 bg-secondary/50 rounded-xl" />
          <div className="h-6 w-full bg-secondary/30 rounded-lg" />
        </div>
        <div className="aspect-video bg-secondary/20 rounded-2xl" />
      </div>
    );
  }

  if (!currentModule) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6">
        <div className="w-16 h-16 bg-secondary/50 rounded-full flex items-center justify-center text-muted-foreground">
          <BookOpen size={32} />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-black mb-2">Module not found</h2>
          <p className="text-muted-foreground">The resource you're looking for might have been moved or deleted.</p>
        </div>
        <button onClick={() => navigate('/dashboard')} className="btn-secondary">
          Return to Workspace
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 animate-fade-in space-y-16 pb-24">
      {/* Breadcrumbs & Header */}
      <section className="space-y-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Workspace
        </button>
        
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-widest">
            <Sparkles size={12} />
            Learning Module
          </div>
          <h1 className="text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            {currentModule.title}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            {currentModule.description}
          </p>
        </div>

        <div className="flex items-center gap-6 pt-2">
            <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                <Clock size={14} className="text-primary" />
                {currentModule.duration}
            </div>
            <div className="w-1 h-1 rounded-full bg-border" />
            <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                <BookOpen size={14} className="text-primary" />
                Mastery Track
            </div>
        </div>
      </section>

      {/* Video Lesson Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
            <h2 className="text-xs font-black uppercase tracking-widest text-muted-foreground/60 border-l-2 border-primary pl-3">Video Workshop</h2>
            <div className="text-[10px] font-bold text-muted-foreground bg-secondary/50 px-2 py-1 rounded">HD 1080p</div>
        </div>
        
        <div className="relative group bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl border border-border/50 transition-all hover:border-primary/20">
          {currentModule?.videoUrl ? (
            <>
              {(() => {
                const videoEmbed = getVideoEmbedUrl(currentModule.videoUrl);

                if (videoEmbed && typeof videoEmbed === 'object') {
                  return (
                    <div className="aspect-video relative">
                      <video
                        className="w-full h-full object-cover"
                        controls
                        controlsList="nodownload"
                      >
                        <source src={videoEmbed.src} type="video/mp4" />
                        Your browser does not support HTML5 video.
                      </video>
                    </div>
                  );
                }

                return videoEmbed ? (
                  <div className="aspect-video relative">
                    <iframe
                      className="w-full h-full border-0"
                      src={videoEmbed}
                      title={currentModule.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  <div className="aspect-video flex flex-col items-center justify-center space-y-4 bg-secondary/20">
                    <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500">
                      <Play size={24} className="ml-1" />
                    </div>
                    <p className="text-xs font-bold text-muted-foreground">Playback unavailable for this module</p>
                  </div>
                );
              })()}
            </>
          ) : (
            <div className="aspect-video flex items-center justify-center bg-secondary/20">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">No video resource provided</p>
            </div>
          )}
        </div>
      </section>

      {/* Deep Dive Content */}
      <section className="space-y-8">
        <h2 className="text-xs font-black uppercase tracking-widest text-muted-foreground/60 border-l-2 border-primary pl-3">Detailed Curriculum</h2>
        <div className="prose prose-invert max-w-none">
          <div className="text-muted-foreground leading-relaxed whitespace-pre-line text-lg font-medium selection:bg-primary/20">
            {currentModule.content}
          </div>
        </div>
      </section>

      {/* Assessment CTA */}
      <section className="pt-16 border-t border-border/50">
        <div className="p-12 rounded-[2rem] bg-secondary/10 border border-border/50 relative overflow-hidden group flex flex-col items-center text-center space-y-8">
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:scale-110 transition-transform">
             <GraduationCap size={200} />
          </div>
          
          <div className="space-y-4 max-w-lg relative z-10">
            <h2 className="text-3xl font-black tracking-tight text-foreground">Ready for assessment?</h2>
            <p className="text-muted-foreground text-sm font-medium">
              Validate your understanding of <span className="text-foreground font-bold">{currentModule.title}</span>. 
              A score of <span className="text-primary font-bold">80%</span> or higher is required for certification.
            </p>
          </div>

          <button
            onClick={handleStartQuiz}
            className="btn-primary py-4 px-12 rounded-full flex items-center gap-3 group relative z-10 shadow-2xl shadow-primary/20"
          >
            Start Module Assessment
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Module;
