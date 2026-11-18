const { pool } = require('../config/db');

function mapResult(row) {
  return {
    _id: String(row.id),
    userId: String(row.user_id),
    topic: row.topic,
    score: Number(row.score),
    totalQuestions: row.total_questions,
    correctAnswers: row.correct_answers || [],
    wrongAnswers: row.wrong_answers || [],
    createdAt: row.created_at,
  };
}

const QuizResult = {
  async create({ userId, topic, score, totalQuestions, correctAnswers = [], wrongAnswers = [] }) {
    const { rows } = await pool.query(
      `INSERT INTO quiz_results (user_id, topic, score, total_questions, correct_answers, wrong_answers)
       VALUES ($1, $2, $3, $4, $5::jsonb, $6::jsonb) RETURNING *`,
      [userId, topic || null, score, totalQuestions, JSON.stringify(correctAnswers), JSON.stringify(wrongAnswers)]
    );
    return mapResult(rows[0]);
  },

  async findByUserId(userId, direction = 'DESC') {
    const sortDirection = direction === 'ASC' ? 'ASC' : 'DESC';
    const { rows } = await pool.query(
      `SELECT * FROM quiz_results WHERE user_id = $1 ORDER BY created_at ${sortDirection}`,
      [userId]
    );
    return rows.map(mapResult);
  },

  async findAll() {
    const { rows } = await pool.query('SELECT * FROM quiz_results ORDER BY created_at DESC');
    return rows.map(mapResult);
  },
};

module.exports = QuizResult;
