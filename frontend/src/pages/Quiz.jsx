import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchQuizStart,
  fetchQuizSuccess,
  fetchQuizFailure,
  submitQuizStart,
  submitQuizSuccess,
  submitQuizFailure
} from '../store/quizSlice';
import { quizService } from '../services/apiService';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Trophy, 
  RotateCcw,
  LayoutDashboard,
  Activity,
  Sparkles
} from 'lucide-react';

const Quiz = () => {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentQuiz, quizResult, loading } = useSelector((state) => state.quiz);
  const [answers, setAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    if (moduleId && moduleId !== 'undefined') {
      fetchQuiz();
    }
  }, [moduleId]);

  const fetchQuiz = async () => {
    try {
      dispatch(fetchQuizStart());
      const data = await quizService.getQuizByModuleId(moduleId);
      dispatch(fetchQuizSuccess(data));
      setAnswers(new Array((data?.questions || []).length).fill(null));
    } catch (error) {
      dispatch(fetchQuizFailure(error.message));
    }
  };

  const handleAnswerSelect = (answerIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < (currentQuiz?.questions || []).length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    if (answers.includes(null)) {
      return;
    }

    try {
      dispatch(submitQuizStart());
      const result = await quizService.submitQuiz({
        quizId: currentQuiz._id,
        moduleId: moduleId,
        answers: answers
      });
      dispatch(submitQuizSuccess(result));
    } catch (error) {
      dispatch(submitQuizFailure(error.message));
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto py-24 space-y-12 animate-pulse">
        <div className="h-2 w-full bg-secondary/50 rounded-full" />
        <div className="h-16 w-3/4 bg-secondary/50 rounded-xl mx-auto" />
        <div className="space-y-4">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-14 bg-secondary/30 rounded-xl" />)}
        </div>
      </div>
    );
  }

  // Result View
  if (quizResult) {
    const passed = quizResult.passed;
    return (
      <div className="max-w-2xl mx-auto py-12 px-6 animate-fade-in">
        <div className="bg-card border border-border/50 rounded-[2.5rem] p-12 text-center relative overflow-hidden shadow-2xl">
          {/* Background Glow */}
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 blur-[120px] opacity-10 rounded-full -translate-y-1/2 ${passed ? 'bg-primary' : 'bg-destructive'}`}></div>
          
          <div className="relative z-10 space-y-10">
            <div className="flex justify-center">
                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center shadow-2xl ${passed ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive'}`}>
                    {passed ? <Trophy size={40} /> : <XCircle size={40} />}
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-center gap-2 text-primary text-[10px] font-black uppercase tracking-widest">
                    <Sparkles size={12} />
                    Assessment Results
                </div>
                <h2 className="text-4xl font-black tracking-tight">{passed ? 'Mastery Achieved' : 'Keep Practicing'}</h2>
                <p className="text-muted-foreground text-sm max-w-sm mx-auto font-medium">
                    You've completed the assessment for this module. Here is how your intelligence performed today.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-secondary/20 border border-border/50 rounded-2xl p-6">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Score</p>
                    <p className={`text-4xl font-black ${passed ? 'text-primary' : 'text-destructive'}`}>{quizResult.score}%</p>
                </div>
                <div className="bg-secondary/20 border border-border/50 rounded-2xl p-6">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Accuracy</p>
                    <p className="text-4xl font-black text-foreground">{quizResult.correctCount}/{quizResult.totalQuestions}</p>
                </div>
            </div>

            {passed ? (
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-[11px] font-medium text-primary leading-relaxed">
                 Excellent. You have demonstrated a high level of competency. Your certification is now available in the analytics dashboard.
              </div>
            ) : (
              <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-4 text-[11px] font-medium text-destructive leading-relaxed">
                 Your score is below the mastery threshold. We recommend revisiting the module curriculum before attempting the assessment again.
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={() => navigate('/progress')}
                className="flex-1 btn-primary py-3.5 rounded-full flex items-center justify-center gap-2"
              >
                <Activity size={16} />
                View Analytics
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="flex-1 btn-secondary py-3.5 rounded-full flex items-center justify-center gap-2"
              >
                <LayoutDashboard size={16} />
                Back to Workspace
              </button>
            </div>
            
            {!passed && (
                 <button
                    onClick={() => window.location.reload()}
                    className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 mx-auto pt-4"
                >
                    <RotateCcw size={12} />
                    Retry Assessment
                </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (!currentQuiz) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-black mb-2">Quiz not found</h2>
          <p className="text-muted-foreground">The assessment for this module is currently unavailable.</p>
        </div>
        <button onClick={() => navigate('/dashboard')} className="btn-secondary">
          Return to Workspace
        </button>
      </div>
    );
  }

  const question = currentQuiz.questions?.[currentQuestion];
  const progress = ((currentQuestion + 1) / (currentQuiz.questions?.length || 1)) * 100;

  if (!question) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-black mb-2">No Questions Found</h2>
          <p className="text-muted-foreground">This assessment has no questions configured.</p>
        </div>
        <button onClick={() => navigate('/dashboard')} className="btn-secondary">
          Return to Workspace
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-6 animate-fade-in space-y-12">
      {/* Assessment Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border/50 pb-8">
        <div className="space-y-1">
            <h1 className="text-2xl font-black tracking-tight">Focused Assessment</h1>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">Question {currentQuestion + 1} of {currentQuiz.questions?.length || 0}</p>
        </div>
        <div className="flex items-center gap-4">
            <div className="w-32 h-1.5 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
            </div>
            <span className="text-[10px] font-black text-muted-foreground uppercase">{Math.round(progress)}%</span>
        </div>
      </div>

      {/* Question Card */}
      <div className="space-y-10">
        <h2 className="text-2xl font-bold leading-snug text-foreground/90">
          {question.questionText || question.question}
        </h2>

        <div className="grid grid-cols-1 gap-3">
          {(question.options || []).map((option, index) => {
            const isSelected = answers[currentQuestion] === index;
            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`group flex items-center gap-4 p-5 rounded-2xl border transition-all text-left ${
                  isSelected
                    ? 'bg-secondary border-primary shadow-sm'
                    : 'bg-secondary/10 border-border/50 hover:bg-secondary/40 hover:border-border'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs transition-colors ${
                  isSelected ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground group-hover:text-foreground'
                }`}>
                  {String.fromCharCode(65 + index)}
                </div>
                <span className={`text-sm font-medium transition-colors ${isSelected ? 'text-foreground font-bold' : 'text-muted-foreground group-hover:text-foreground'}`}>
                    {option}
                </span>
                {isSelected && <CheckCircle2 size={18} className="ml-auto text-primary" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between pt-10 border-t border-border/50">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground disabled:opacity-30 transition-all"
        >
          <ArrowLeft size={14} />
          Previous
        </button>

        {currentQuestion === (currentQuiz.questions?.length || 0) - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={answers[currentQuestion] === null}
            className="btn-primary py-3 px-8 rounded-full flex items-center gap-2 shadow-xl shadow-primary/10 disabled:opacity-50"
          >
            Finish Assessment
            <ArrowRight size={16} />
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={answers[currentQuestion] === null}
            className="btn-secondary py-3 px-8 rounded-full flex items-center gap-2 disabled:opacity-50"
          >
            Next Question
            <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
