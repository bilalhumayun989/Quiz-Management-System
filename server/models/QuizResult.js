const mongoose = require('mongoose');

const quizResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  topic: { type: String },
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  correctAnswers: [
    {
      question: String,
      userAnswer: String,
    }
  ],
  wrongAnswers: [
    {
      question: String,
      correctAnswer: String,
      userAnswer: String,
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('QuizResult', quizResultSchema);
