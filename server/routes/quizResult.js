const express = require('express');
const router = express.Router();
const QuizResult = require('../models/QuizResult');

router.post('/submit', async (req, res) => {
  try {
    const { userId, topic, score, totalQuestions, correctAnswers, wrongAnswers } = req.body;
     console.log(userId , topic)
    const result = new QuizResult({
      userId,
      topic,
      score,
      totalQuestions,
      correctAnswers,
      wrongAnswers,
    });

    await result.save();
    res.status(201).json({ message: 'Result saved successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save result' });
  }
});

router.get('/results/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const results = await QuizResult.find({ userId }).sort({ createdAt: -1 }); // Latest first
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch results' });
  }
});
router.get('/all-results', async (req, res) => {
  try {
    const results = await QuizResult.find().sort({ createdAt: -1 });
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch all results' });
  }
});

module.exports = router;
