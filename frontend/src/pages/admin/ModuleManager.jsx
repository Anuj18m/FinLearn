import React, { useState, useEffect } from 'react';
import { moduleService } from '../../services/apiService';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Video, 
  Clock, 
  BookOpen,
  X,
  Save,
  Loader2,
  AlertCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';

const ModuleManager = () => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentModule, setCurrentModule] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoUrl: '',
    duration: '',
    content: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    try {
      const data = await moduleService.getAllModules();
      setModules(data);
    } catch (err) {
      // Silent failure
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (module = null) => {
    if (module) {
      setCurrentModule(module);
      setFormData({
        title: module.title,
        description: module.description,
        videoUrl: module.videoUrl,
        duration: module.duration,
        content: module.content
      });
    } else {
      setCurrentModule(null);
      setFormData({
        title: '',
        description: '',
        videoUrl: '',
        duration: '',
        content: ''
      });
    }
    setError(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      if (currentModule) {
        await moduleService.updateModule(currentModule._id, formData);
      } else {
        await moduleService.createModule(formData);
      }
      setIsModalOpen(false);
      fetchModules();
    } catch (err) {
      setError(err.response?.data?.message || 'Transaction failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this resource? This action is irreversible.')) {
      try {
        await moduleService.deleteModule(id);
        fetchModules();
      } catch (err) {
        alert('Operation failed');
      }
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-12 px-6 space-y-12 animate-pulse">
        <div className="h-10 w-48 bg-secondary/50 rounded-lg" />
        <div className="space-y-4">
            {[1, 2, 3].map(i => <div key={i} className="h-20 bg-secondary/20 rounded-xl" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-6 animate-fade-in space-y-12 pb-24">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-widest">
            <Sparkles size={12} />
            Content Engineering
          </div>
          <h1 className="text-4xl font-black tracking-tight">Curriculum Manager</h1>
          <p className="text-muted-foreground text-sm font-medium">Design and refine the core learning resources for the platform.</p>
        </div>
        
        <button 
          onClick={() => handleOpenModal()}
          className="btn-primary py-3 px-8 rounded-full flex items-center gap-2 shadow-xl shadow-primary/10"
        >
          <Plus size={16} />
          Create Module
        </button>
      </section>

      {/* Modules Table */}
      <section className="bg-card border border-border/50 rounded-3xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-secondary/20 border-b border-border/50">
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">Resource</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 text-center">Specs</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 text-right">Controls</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30">
            {(modules || []).map((module) => (
              <tr key={module._id} className="hover:bg-secondary/10 transition-all group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors border border-border/50">
                      <BookOpen size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground/90">{module.title}</p>
                      <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tight line-clamp-1 max-w-[250px]">{module.description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center justify-center gap-6">
                    <div className="flex items-center gap-1.5 text-[10px] font-black text-muted-foreground uppercase">
                      <Video size={12} className={module.videoUrl ? 'text-primary' : 'opacity-20'} />
                      {module.videoUrl ? 'Video' : 'Text'}
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-black text-muted-foreground uppercase">
                      <Clock size={12} className="text-primary" />
                      {module.duration}
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <button 
                      onClick={() => handleOpenModal(module)}
                      className="w-8 h-8 flex items-center justify-center bg-secondary/50 hover:bg-primary/10 hover:text-primary rounded-lg transition-all text-muted-foreground"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button 
                      onClick={() => handleDelete(module._id)}
                      className="w-8 h-8 flex items-center justify-center bg-secondary/50 hover:bg-destructive/10 hover:text-destructive rounded-lg transition-all text-muted-foreground"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Minimal Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-background/80 backdrop-blur-md animate-fade-in">
          <div className="bg-card w-full max-w-2xl rounded-[2.5rem] border border-border/50 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-8 border-b border-border/50 flex items-center justify-between bg-secondary/10">
              <div className="space-y-1">
                <h2 className="text-xl font-black tracking-tight">{currentModule ? 'Edit Resource' : 'Engine New Resource'}</h2>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Platform Curriculum Database</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 flex items-center justify-center bg-secondary rounded-full text-muted-foreground hover:text-foreground transition-all">
                <X size={18} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto custom-scrollbar">
              {error && (
                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-xl flex items-center gap-3 text-destructive text-[11px] font-black uppercase tracking-widest">
                  <AlertCircle size={14} />
                  {error}
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Title</label>
                  <input 
                    required
                    type="text" 
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="e.g., Risk Management"
                    className="w-full bg-secondary/20 border border-border/50 rounded-xl py-3 px-4 text-sm focus:bg-secondary/40 focus:border-primary/50 transition-all placeholder:text-muted-foreground/20"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Duration</label>
                  <input 
                    required
                    type="text" 
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    placeholder="e.g., 20 mins"
                    className="w-full bg-secondary/20 border border-border/50 rounded-xl py-3 px-4 text-sm focus:bg-secondary/40 focus:border-primary/50 transition-all placeholder:text-muted-foreground/20"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">YouTube ID</label>
                <input 
                  type="text" 
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({...formData, videoUrl: e.target.value})}
                  placeholder="e.g., dQw4w9WgXcQ"
                  className="w-full bg-secondary/20 border border-border/50 rounded-xl py-3 px-4 text-sm focus:bg-secondary/40 focus:border-primary/50 transition-all placeholder:text-muted-foreground/20"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Context</label>
                <textarea 
                  required
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="High-level overview..."
                  className="w-full bg-secondary/20 border border-border/50 rounded-xl py-3 px-4 text-sm focus:bg-secondary/40 focus:border-primary/50 transition-all placeholder:text-muted-foreground/20 resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Curriculum Payload</label>
                <textarea 
                  required
                  rows={6}
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  placeholder="Enter module content (Markdown supported)..."
                  className="w-full bg-secondary/20 border border-border/50 rounded-xl py-3 px-4 text-sm focus:bg-secondary/40 focus:border-primary/50 transition-all placeholder:text-muted-foreground/20"
                />
              </div>

              <div className="flex items-center gap-3 pt-4 sticky bottom-0 bg-card">
                <button 
                  type="submit" 
                  disabled={submitting}
                  className="flex-1 btn-primary py-4 rounded-full font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-primary/10 disabled:opacity-50"
                >
                  {submitting ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                  {currentModule ? 'Sync Changes' : 'Initialize Module'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModuleManager;
