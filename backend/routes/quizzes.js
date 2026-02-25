import express from 'express';
import Quiz from '../models/Quiz.js';
import Progress from '../models/Progress.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/quizzes/module/:moduleId
// @desc    Get quiz by module ID
// @access  Public
router.get('/module/:moduleId', async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ moduleId: req.params.moduleId });
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Return quiz without correct answers for security
    const quizWithoutAnswers = {
      _id: quiz._id,
      moduleId: quiz.moduleId,
      title: quiz.title,
      passingScore: quiz.passingScore,
      questions: quiz.questions.map(q => ({
        _id: q._id,
        question: q.question,
        options: q.options
      }))
    };

    res.json(quizWithoutAnswers);
  } catch (error) {
    console.error('Get quiz error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/quizzes/submit
// @desc    Submit quiz answers
// @access  Private
router.post('/submit', auth, async (req, res) => {
  try {
    const { quizId, moduleId, answers } = req.body;

    // Get quiz with correct answers
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Calculate score
    let correctCount = 0;
    const detailedAnswers = answers.map((answer, index) => {
      const isCorrect = answer === quiz.questions[index].correctAnswer;
      if (isCorrect) correctCount++;
      return {
        questionIndex: index,
        selectedAnswer: answer,
        isCorrect
      };
    });

    const score = Math.round((correctCount / quiz.questions.length) * 100);
    const passed = score >= quiz.passingScore;

    // Save or update progress
    const progress = await Progress.findOneAndUpdate(
      { userId: req.userId, moduleId, quizId },
      {
        userId: req.userId,
        moduleId,
        quizId,
        score,
        passed,
        answers: detailedAnswers,
        completedAt: new Date()
      },
      { upsert: true, new: true }
    );

    res.json({
      score,
      passed,
      correctCount,
      totalQuestions: quiz.questions.length,
      progress
    });
  } catch (error) {
    console.error('Submit quiz error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/quizzes
// @desc    Get all quizzes
// @access  Private/Admin
router.get('/', auth, async (req, res) => {
  try {
    if (req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const quizzes = await Quiz.find().populate('moduleId', 'title slug');
    res.json(quizzes);
  } catch (error) {
    console.error('Get quizzes error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/quizzes
// @desc    Create a new quiz
// @access  Private/Admin
router.post('/', auth, async (req, res) => {
  try {
    if (req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const quiz = new Quiz(req.body);
    await quiz.save();
    res.status(201).json(quiz);
  } catch (error) {
    console.error('Create quiz error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/quizzes/:id
// @desc    Update a quiz
// @access  Private/Admin
router.put('/:id', auth, async (req, res) => {
  try {
    if (req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const quiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.json(quiz);
  } catch (error) {
    console.error('Update quiz error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/quizzes/:id
// @desc    Delete a quiz
// @access  Private/Admin
router.delete('/:id', auth, async (req, res) => {
  try {
    if (req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    console.error('Delete quiz error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
