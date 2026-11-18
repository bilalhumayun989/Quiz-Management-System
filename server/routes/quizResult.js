const express = require('express');
const router = express.Router();
const QuizResult = require('../models/QuizResult');

router.post('/submit', async (req, res) => {
  try {
    const { userId, topic, score, totalQuestions, correctAnswers, wrongAnswers } = req.body;
     console.log(userId , topic)
    await QuizResult.create({
      userId,
      topic,
      score,
      totalQuestions,
      correctAnswers,
      wrongAnswers,
    });

    res.status(201).json({ message: 'Result saved successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save result' });
  }
});

router.get('/results/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const results = await QuizResult.findByUserId(userId, 'DESC'); // Latest first
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch results' });
  }
});
router.get('/all-results', async (req, res) => {
  try {
    const results = await QuizResult.findAll();
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch all results' });
  }
});

// GET /api/result/dashboard-stats/:userId
// Returns aggregated stats for the dashboard overview
router.get('/dashboard-stats/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const results = await QuizResult.findByUserId(userId, 'ASC');

    if (results.length === 0) {
      return res.status(200).json({
        totalQuizzes: 0,
        avgScore: 0,
        bestScore: 0,
        totalCorrect: 0,
        totalWrong: 0,
        bestTopic: null,
        topicStats: [],
        recentTrend: [],
        scoreDistribution: [],
      });
    }

    const totalQuizzes = results.length;
    const totalCorrect = results.reduce((s, r) => s + (Array.isArray(r.correctAnswers) ? r.correctAnswers.length : 0), 0);
    const totalWrong = results.reduce((s, r) => s + (Array.isArray(r.wrongAnswers) ? r.wrongAnswers.length : 0), 0);
    const avgScore = (results.reduce((s, r) => s + (r.totalQuestions > 0 ? (r.score / r.totalQuestions) * 100 : 0), 0) / totalQuizzes).toFixed(1);
    const bestScore = Math.max(...results.map(r => r.totalQuestions > 0 ? ((r.score / r.totalQuestions) * 100) : 0)).toFixed(1);

    // Per-topic aggregation
    const topicMap = {};
    results.forEach(r => {
      const t = (r.topic || 'Unknown').toLowerCase();
      if (!topicMap[t]) topicMap[t] = { topic: r.topic || 'Unknown', quizzes: 0, totalPct: 0, best: 0 };
      const pct = r.totalQuestions > 0 ? (r.score / r.totalQuestions) * 100 : 0;
      topicMap[t].quizzes += 1;
      topicMap[t].totalPct += pct;
      if (pct > topicMap[t].best) topicMap[t].best = pct;
    });

    const topicStats = Object.values(topicMap).map(t => ({
      topic: t.topic,
      quizzes: t.quizzes,
      avgPct: parseFloat((t.totalPct / t.quizzes).toFixed(1)),
      best: parseFloat(t.best.toFixed(1)),
    })).sort((a, b) => b.avgPct - a.avgPct);

    const bestTopic = topicStats[0]?.topic || null;

    // Last 10 quizzes for trend line
    const recentTrend = results.slice(-10).map((r, i) => ({
      quiz: i + 1,
      score: r.totalQuestions > 0 ? parseFloat(((r.score / r.totalQuestions) * 100).toFixed(1)) : 0,
      topic: r.topic,
      date: new Date(r.createdAt).toLocaleDateString(),
    }));

    // Score distribution buckets: 0-20, 21-40, 41-60, 61-80, 81-100
    const buckets = [
      { range: '0-20%', min: 0, max: 20, count: 0 },
      { range: '21-40%', min: 21, max: 40, count: 0 },
      { range: '41-60%', min: 41, max: 60, count: 0 },
      { range: '61-80%', min: 61, max: 80, count: 0 },
      { range: '81-100%', min: 81, max: 100, count: 0 },
    ];
    results.forEach(r => {
      const pct = r.totalQuestions > 0 ? (r.score / r.totalQuestions) * 100 : 0;
      for (const b of buckets) {
        if (pct <= b.max) { b.count++; break; }
      }
    });
    const scoreDistribution = buckets.map(b => ({ range: b.range, count: b.count }));

    res.status(200).json({
      totalQuizzes,
      avgScore: parseFloat(avgScore),
      bestScore: parseFloat(bestScore),
      totalCorrect,
      totalWrong,
      bestTopic,
      topicStats,
      recentTrend,
      scoreDistribution,
    });
  } catch (err) {
    console.error('Dashboard stats error:', err);
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

module.exports = router;
