import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaClock, FaCheckCircle } from 'react-icons/fa';
import './show-question.css';

export default function ShowQuestion() {
  const location = useLocation();
  const navigate = useNavigate();
  const { questions, topic } = location.state || {};

  const [answers, setAnswers] = useState({});
  const [secondsLeft, setSecondsLeft] = useState(120); // 2 minutes
  const intervalRef = useRef(null);
  const answersRef = useRef({});

  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  const handleAutoSubmit = useCallback(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      alert("Session expired. Please log in again.");
      return navigate('/login');
    }

    const currentAnswers = answersRef.current;

    const results = questions.map((q, i) => {
      const userAnswer = currentAnswers[i];
      const userSelectedLetter = userAnswer?.split('.')[0]?.trim();
      const isCorrect = userSelectedLetter === q.answer;

      return {
        question: q.question,
        options: q.options,
        correctAnswer: q.answer,
        userAnswer: userAnswer || 'Not Attempted',
        isCorrect,
      };
    });

    navigate('/result', { state: { results, topic } });
  }, [navigate, questions, topic]);

  useEffect(() => {
    if (!questions) return; // Prevent timer if no questions

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [handleAutoSubmit, questions]);

  const handleChange = (questionIndex, selectedOption) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: selectedOption }));
  };

  const handleSubmit = () => {
    clearInterval(intervalRef.current);
    handleAutoSubmit();
  };

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60).toString().padStart(2, '0');
    const sec = (seconds % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
  };

  if (!questions) {
    return (
      <div className="text-center pt-5 mt-5">
        <h3 className="text-white">No active quiz. Please go back and select a topic.</h3>
        <button className="btn btn-primary mt-3" onClick={() => navigate('/quiz')}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="quiz-wrapper">
      <div className={`timer-box ${secondsLeft < 30 ? 'urgent' : ''}`}>
        <FaClock /> <span className="time-text">{formatTime(secondsLeft)}</span>
      </div>

      <motion.div
        className="show-question-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="quiz-header-title">{topic || 'Quiz Challenge'}</h2>

        {questions.map((q, index) => (
          <motion.div
            key={index}
            className="question-block"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <p className="question-text">
              <span className="text-primary me-2">Q{index + 1}.</span> {q.question}
            </p>

            <div className="options-grid">
              {q.options.map((opt, idx) => {
                const isSelected = answers[index] === opt;
                return (
                  <div
                    key={idx}
                    className={`option-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleChange(index, opt)}
                  >
                    <div className="d-flex align-items-center w-100">
                      <div className={`option-radio-custom me-3 border rounded-circle d-flex align-items-center justify-content-center ${isSelected ? 'bg-white text-primary' : 'border-secondary'}`} style={{ width: '24px', height: '24px' }}>
                        {isSelected && <div className="bg-current rounded-circle" style={{ width: '12px', height: '12px', backgroundColor: 'currentColor' }}></div>}
                      </div>
                      <span className="flex-grow-1">{opt}</span>
                      {isSelected && <FaCheckCircle className="ms-2" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}

        <motion.button
          className="btn-submit"
          onClick={handleSubmit}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Submit Quiz
        </motion.button>
      </motion.div>
    </div>
  );
}
