import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaTimesCircle, FaSave, FaRedo } from 'react-icons/fa';
import './result.css';

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { results, topic } = location.state || {};
  const userId = localStorage.getItem("userId");

  const correctAnswers = results?.filter((r) => r.isCorrect) || [];
  const wrongAnswers = results?.filter((r) => !r.isCorrect) || [];

  const [isSaved, setIsSaved] = useState(false);

  const handleSaveResult = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/result/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          topic,
          score: correctAnswers.length,
          totalQuestions: results.length,
          correctAnswers: correctAnswers.map(r => ({
            question: r.question,
            userAnswer: r.userAnswer
          })),
          wrongAnswers: wrongAnswers.map(r => ({
            question: r.question,
            correctAnswer: r.correctAnswer,
            userAnswer: r.userAnswer
          }))
        })
      });

      if (res.ok) {
        setIsSaved(true);
        setTimeout(() => navigate('/'), 1500); // Navigate home after delay
      } else {
        console.error("Failed to save result.");
        alert("Failed to save result. Please try again.");
      }
    } catch (error) {
      console.error('Error saving result:', error);
    }
  };

  const handleMoreQuestions = async () => {
    const askedQuestions = results.map(r => r.question); // previous questions

    try {
      const res = await fetch('http://localhost:5000/api/questions/more', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, exclude: askedQuestions }),
      });

      const data = await res.json();

      if (data && data.questions && data.questions.length > 0) {
        navigate('/show-question', { state: { questions: data.questions, topic } });
      } else {
        alert("No more new questions available for this topic.");
      }
    } catch (error) {
      console.error("Failed to fetch more questions:", error);
    }
  };

  if (!results) {
    return (
      <div className="text-center pt-5 mt-5">
        <h3 className="text-white">No results found.</h3>
        <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>Go Home</button>
      </div>
    );
  }

  return (
    <div className="result-wrapper">
      <motion.div
        className="score-card"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="score-title">Final Score</h2>
        <div className="score-value">
          {correctAnswers.length} <span className="score-total">/ {results.length}</span>
        </div>
        <p className="text-muted mt-2">Topic: {topic}</p>
      </motion.div>

      <div className="result-sections-container">
        {/* Wrong Answers Column */}
        <motion.div
          className="result-section wrong-section"
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3><FaTimesCircle /> Incorrect Answers ({wrongAnswers.length})</h3>
          {wrongAnswers.length === 0 ? (
            <p className="text-muted italic">Great job! No incorrect answers.</p>
          ) : (
            wrongAnswers.map((r, idx) => (
              <div key={idx} className="question-card wrong-bg">
                <p className="mb-2"><strong>Q:</strong> {r.question}</p>
                <p className="mb-1 text-danger small"><strong>Your Answer:</strong> {r.userAnswer || 'Not Attempted'}</p>
                <span className="correct-answer-text small">Correct: {r.correctAnswer}</span>
              </div>
            ))
          )}
        </motion.div>

        {/* Correct Answers Column */}
        <motion.div
          className="result-section correct-section"
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3><FaCheckCircle /> Correct Answers ({correctAnswers.length})</h3>
          {correctAnswers.length === 0 ? (
            <p className="text-muted italic">No correct answers yet. Keep practicing!</p>
          ) : (
            correctAnswers.map((r, idx) => (
              <div key={idx} className="question-card correct-bg">
                <p className="mb-2"><strong>Q:</strong> {r.question}</p>
                <p className="mb-0 text-success small"><strong>Your Answer:</strong> {r.userAnswer}</p>
              </div>
            ))
          )}
        </motion.div>
      </div>

      <motion.div
        className="result-actions"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <button
          onClick={handleSaveResult}
          className="btn-save"
          disabled={isSaved}
        >
          <FaSave className="me-2" />
          {isSaved ? "Saved to Dashboard" : "Save Record"}
        </button>

        <button className="btn-more" onClick={handleMoreQuestions}>
          <FaRedo className="me-2" />
          Try More Questions
        </button>
      </motion.div>
    </div>
  );
}
