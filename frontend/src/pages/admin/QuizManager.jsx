import React, { useState, useEffect } from 'react';
import { quizService, moduleService } from '../../services/apiService';
import { 
  Plus, 
  Trash2, 
  PlusCircle, 
  Save, 
  X,
  Settings2,
  AlertCircle,
  Loader2,
  Sparkles,
  ArrowRight
} from 'lucide-react';

const QuizManager = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [formData, setFormData] = useState({
    moduleId: '',
    passingScore: 70,
    questions: [
      { questionText: '', options: ['', '', '', ''], correctAnswer: 0 }
    ]
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [quizzesRes, modulesRes] = await Promise.all([
        quizService.getAllQuizzes(),
        moduleService.getAllModules()
      ]);
      setQuizzes(quizzesRes);
      setModules(modulesRes);
    } catch (err) {
      // Silent failure
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (quiz = null) => {
    if (quiz) {
      setCurrentQuiz(quiz);
      setFormData({
        moduleId: quiz.moduleId?._id || quiz.moduleId,
        passingScore: quiz.passingScore || 70,
        questions: quiz.questions.map(q => ({
          questionText: q.questionText,
          options: [...q.options],
          correctAnswer: q.correctAnswer
        }))
      });
    } else {
      setCurrentQuiz(null);
      setFormData({
        moduleId: '',
        passingScore: 70,
        questions: [{ questionText: '', options: ['', '', '', ''], correctAnswer: 0 }]
      });
    }
    setError(null);
    setIsModalOpen(true);
  };

  const handleAddQuestion = () => {
    setFormData({
      ...formData,
      questions: [...formData.questions, { questionText: '', options: ['', '', '', ''], correctAnswer: 0 }]
    });
  };

  const handleRemoveQuestion = (index) => {
    if (formData.questions.length > 1) {
      if (window.confirm('Remove this question record?')) {
        const newQuestions = formData.questions.filter((_, i) => i !== index);
        setFormData({ ...formData, questions: newQuestions });
      }
    }
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...formData.questions];
    newQuestions[index][field] = value;
    setFormData({ ...formData, questions: newQuestions });
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const newQuestions = [...formData.questions];
    newQuestions[qIndex].options[oIndex] = value;
    setFormData({ ...formData, questions: newQuestions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      if (currentQuiz) {
        await quizService.updateQuiz(currentQuiz._id, formData);
      } else {
        await quizService.createQuiz(formData);
      }
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Assessment validation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this assessment resource?')) {
      try {
        await quizService.deleteQuiz(id);
        fetchData();
      } catch (err) {
        alert('Operation failed');
      }
    }
  };

  if (loading) return (
    <div className="max-w-6xl mx-auto py-12 px-6 space-y-12 animate-pulse">
        <div className="h-10 w-48 bg-secondary/50 rounded-lg" />
        <div className="grid grid-cols-3 gap-6">
            {[1, 2, 3].map(i => <div key={i} className="h-48 bg-secondary/20 rounded-2xl" />)}
        </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto py-12 px-6 animate-fade-in space-y-12 pb-24">
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-widest">
                <Sparkles size={12} />
                Assessment Engineering
            </div>
            <h1 className="text-4xl font-black tracking-tight">Quiz Designer</h1>
            <p className="text-muted-foreground text-sm font-medium">Build and calibrate assessments to validate curriculum mastery.</p>
        </div>
        <button 
            onClick={() => handleOpenModal()} 
            className="btn-primary py-3 px-8 rounded-full flex items-center gap-2 shadow-xl shadow-primary/10"
        >
          <Plus size={16} /> Create Quiz
        </button>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(quizzes || []).map((quiz) => (
          <div key={quiz._id} className="bg-card border border-border/50 rounded-3xl p-6 hover:bg-secondary/10 transition-all flex flex-col group relative">
            <div className="flex justify-between items-start mb-6">
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors border border-border/50">
                <Settings2 size={16} />
              </div>
              <div className="flex gap-1">
                <button 
                    onClick={() => handleOpenModal(quiz)} 
                    className="w-8 h-8 flex items-center justify-center hover:bg-primary/10 hover:text-primary rounded-lg transition-all text-muted-foreground"
                >
                  <PlusCircle size={14} />
                </button>
                <button 
                    onClick={() => handleDelete(quiz._id)} 
                    className="w-8 h-8 flex items-center justify-center hover:bg-destructive/10 hover:text-destructive rounded-lg transition-all text-muted-foreground"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <div className="space-y-1 mb-6">
                <h3 className="text-sm font-bold text-foreground/90 truncate">{quiz.moduleId?.title || 'Unlinked Module'}</h3>
                <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">
                    {quiz.questions.length} Items • {quiz.passingScore}% Mastery
                </p>
            </div>
            <button 
              onClick={() => handleOpenModal(quiz)}
              className="mt-auto w-full py-2.5 bg-secondary/30 hover:bg-secondary/60 rounded-xl text-[11px] font-bold transition-all flex items-center justify-center gap-2"
            >
              Configure Logic <ArrowRight size={12} />
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-background/80 backdrop-blur-md animate-fade-in">
          <div className="bg-card w-full max-w-3xl max-h-[90vh] rounded-[2.5rem] border border-border/50 shadow-2xl overflow-hidden flex flex-col">
            <div className="p-8 border-b border-border/50 flex items-center justify-between bg-secondary/10">
              <div className="space-y-1">
                <h2 className="text-xl font-black tracking-tight">{currentQuiz ? 'Configure Assessment' : 'New Assessment Engine'}</h2>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Assessment Logic & Distribution</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 flex items-center justify-center bg-secondary rounded-full text-muted-foreground hover:text-foreground transition-all">
                <X size={18} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
              {error && <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive text-[11px] font-black uppercase tracking-widest flex items-center gap-2"><AlertCircle size={14} />{error}</div>}
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Parent Module</label>
                  <select 
                    required
                    value={formData.moduleId}
                    onChange={(e) => setFormData({...formData, moduleId: e.target.value})}
                    className="w-full bg-secondary/20 border border-border/50 rounded-xl py-3 px-4 text-sm focus:bg-secondary/40 focus:border-primary/50 transition-all appearance-none"
                  >
                    <option value="">Link to curriculum...</option>
                    {(modules || []).map(m => <option key={m._id} value={m._id}>{m.title}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Mastery Threshold (%)</label>
                  <input 
                    type="number" 
                    value={formData.passingScore}
                    onChange={(e) => setFormData({...formData, passingScore: e.target.value})}
                    className="w-full bg-secondary/20 border border-border/50 rounded-xl py-3 px-4 text-sm focus:bg-secondary/40 focus:border-primary/50 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex items-center justify-between border-b border-border/50 pb-4">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-primary">Question Set ({formData.questions.length})</h3>
                  <button type="button" onClick={handleAddQuestion} className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:text-primary transition-colors bg-secondary/50 px-3 py-1.5 rounded-full">
                    <PlusCircle size={12} /> Add Item
                  </button>
                </div>

                <div className="space-y-6">
                    {(formData.questions || []).map((q, qIndex) => (
                    <div key={qIndex} className="p-8 bg-secondary/10 rounded-3xl border border-border/50 relative group/q">
                        <button 
                        type="button" 
                        onClick={() => handleRemoveQuestion(qIndex)}
                        className="absolute top-6 right-6 p-1.5 hover:bg-destructive/10 rounded-lg text-muted-foreground hover:text-destructive opacity-0 group-hover/q:opacity-100 transition-all"
                        >
                        <Trash2 size={16} />
                        </button>
                        
                        <div className="space-y-6">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Question {qIndex + 1}</label>
                            <input 
                            required
                            value={q.questionText}
                            onChange={(e) => handleQuestionChange(qIndex, 'questionText', e.target.value)}
                            placeholder="Enter the inquiry..."
                            className="w-full bg-background border border-border/50 rounded-xl py-3 px-4 text-sm focus:border-primary/50 transition-all"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {(q.options || []).map((opt, oIndex) => (
                            <div key={oIndex} className="space-y-1.5">
                                <div className="flex items-center justify-between px-1">
                                <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/50">Option {String.fromCharCode(65 + oIndex)}</label>
                                <input 
                                    type="radio" 
                                    name={`correct-${qIndex}`} 
                                    checked={q.correctAnswer === oIndex}
                                    onChange={() => handleQuestionChange(qIndex, 'correctAnswer', oIndex)}
                                    className="w-3 h-3 accent-primary"
                                />
                                </div>
                                <input 
                                required
                                value={opt}
                                onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                                className={`w-full bg-background border rounded-xl py-2.5 px-4 text-xs transition-all focus:border-primary/50 ${q.correctAnswer === oIndex ? 'border-primary/30 ring-1 ring-primary/10' : 'border-border/50'}`}
                                />
                            </div>
                            ))}
                        </div>
                        </div>
                    </div>
                    ))}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 sticky bottom-0 bg-card">
                <button 
                  type="submit" 
                  disabled={submitting} 
                  className="w-full btn-primary py-4 rounded-full font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-primary/10 disabled:opacity-50"
                >
                  {submitting ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                  Synchronize Assessment Logic
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizManager;
