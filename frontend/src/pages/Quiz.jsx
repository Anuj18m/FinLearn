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

const Quiz = () => {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentQuiz, quizResult, loading } = useSelector((state) => state.quiz);
  const [answers, setAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    fetchQuiz();
  }, [moduleId]);

  const fetchQuiz = async () => {
    try {
      dispatch(fetchQuizStart());
      const data = await quizService.getQuizByModuleId(moduleId);
      dispatch(fetchQuizSuccess(data));
      setAnswers(new Array(data.questions.length).fill(null));
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
    if (currentQuestion < currentQuiz.questions.length - 1) {
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
      alert('Please answer all questions before submitting!');
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading quiz...</div>
      </div>
    );
  }

  if (quizResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-sm border border-gray-100 p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Quiz Results</h2>
          
          <div className="text-center mb-8">
            <div className={`text-6xl font-bold mb-4 ${quizResult.passed ? 'text-accent' : 'text-red-500'}`}>
              {quizResult.score}%
            </div>
            <div className="text-xl text-gray-700 mb-2">
              {quizResult.correctCount} out of {quizResult.totalQuestions} correct
            </div>
            <div className={`text-lg font-semibold ${quizResult.passed ? 'text-accent' : 'text-red-500'}`}>
              {quizResult.passed ? '✓ Passed!' : '✗ Failed - Try Again'}
            </div>
          </div>

          {quizResult.passed && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6">
              <p className="text-emerald-800 text-center">
                Congratulations! You can now download your certificate from the Progress page.
              </p>
            </div>
          )}

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => navigate('/progress')}
              className="bg-primary text-white px-6 py-2 rounded hover:bg-secondary"
            >
              View Progress
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentQuiz) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Quiz not found</div>
      </div>
    );
  }

  const question = currentQuiz.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Question {currentQuestion + 1} of {currentQuiz.questions.length}</span>
              <span>{Math.round(((currentQuestion + 1) / currentQuiz.questions.length) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary rounded-full h-2 transition-all"
                style={{ width: `${((currentQuestion + 1) / currentQuiz.questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {question.question}
          </h2>

          {/* Options */}
          <div className="space-y-4 mb-8">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 rounded-lg border-2 transition ${
                  answers[currentQuestion] === index
                    ? 'border-primary bg-cyan-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="font-semibold mr-2">{String.fromCharCode(65 + index)}.</span>
                {option}
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="px-6 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Previous
            </button>

            {currentQuestion === currentQuiz.questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 rounded bg-accent text-white hover:bg-emerald-600 transition"
              >
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-6 py-2 rounded bg-primary text-white hover:bg-secondary transition"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
