import Quiz from '../models/Quiz.js';
import QuizSubmission from '../models/QuizSubmission.js';
import Progress from '../models/Progress.js';
import ApiError from '../utils/ApiError.js';

/**
 * Get quiz for a module (sanitized for students)
 */
export const getQuizForModule = async (moduleId) => {
  const quiz = await Quiz.findOne({ moduleId });
  if (!quiz) throw new ApiError(404, 'Quiz not found for this module');

  // Strip correct answers before sending to student
  const sanitizedQuiz = quiz.toObject();
  sanitizedQuiz.questions = sanitizedQuiz.questions.map(q => {
    const { correctAnswer, ...rest } = q;
    return rest;
  });

  return sanitizedQuiz;
};

/**
 * Core Assessment Logic: Grade, Save, and Update Progress
 */
export const submitQuizAnswers = async (userId, submissionData) => {
  const { quizId, moduleId, answers } = submissionData;

  const quiz = await Quiz.findById(quizId);
  if (!quiz) throw new ApiError(404, 'Quiz not found');

  if (answers.length !== quiz.questions.length) {
    throw new ApiError(400, `Expected ${quiz.questions.length} answers, but received ${answers.length}`);
  }

  // 1. Calculate Score
  let correctCount = 0;
  const gradedAnswers = answers.map((selected, index) => {
    const isCorrect = selected === quiz.questions[index].correctAnswer;
    if (isCorrect) correctCount++;
    return {
      questionIndex: index,
      selectedAnswer: selected,
      isCorrect
    };
  });

  const score = Math.round((correctCount / quiz.questions.length) * 100);
  const passed = score >= quiz.passingScore;

  // 2. Create Permanent Submission Record
  const submission = await QuizSubmission.create({
    userId,
    quizId,
    moduleId,
    answers: gradedAnswers,
    score,
    correctCount,
    totalQuestions: quiz.questions.length,
    passed
  });

  // 3. Update User Progress
  await Progress.findOneAndUpdate(
    { userId, moduleId },
    {
      $max: { score: score },
      $set: { 
        passed: passed, 
        completedAt: passed ? new Date() : null,
        lastAttemptAt: new Date()
      }
    },
    { upsert: true }
  );

  return submission;
};

/**
 * Get all quizzes (for admin)
 */
export const getAllQuizzes = async () => {
  return await Quiz.find().populate('moduleId', 'title');
};

/**
 * Create a new quiz
 */
export const createQuiz = async (quizData) => {
  const existingQuiz = await Quiz.findOne({ moduleId: quizData.moduleId });
  if (existingQuiz) {
    throw new ApiError(400, 'A quiz already exists for this module');
  }
  return await Quiz.create(quizData);
};

/**
 * Update a quiz
 */
export const updateQuiz = async (id, quizData) => {
  const quiz = await Quiz.findByIdAndUpdate(id, quizData, {
    new: true,
    runValidators: true
  });
  if (!quiz) throw new ApiError(404, 'Quiz not found');
  return quiz;
};

/**
 * Delete a quiz
 */
export const deleteQuiz = async (id) => {
  const quiz = await Quiz.findByIdAndDelete(id);
  if (!quiz) throw new ApiError(404, 'Quiz not found');
  return quiz;
};
