import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './TopicSearch.css';
import API_BASE from '../../api';

const TopicSearch = () => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return;
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });

      const data = await res.json();
      if (data && data.questions) {
        setTimeout(() => {
          navigate('/show-question', {
            state: { questions: data.questions, topic },
          });
        }, 800);
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="topic-container">
      <motion.div
        className="content-box text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="quiz-title">Explore <span>Topics</span></h1>
        <p className="quiz-description">
          Enter any subject or field of interest. Our intelligent system will
          generate a custom challenge perfectly suited for your learning journey.
        </p>

        <form onSubmit={handleSearch} className="topic-form mt-4">
          <div className="topic-input-wrapper">
            <input
              type="text"
              placeholder="e.g. Quantum Physics, React Hooks..."
              className="topic-input"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
            />
            <button type="submit" className="topic-search-btn" disabled={loading}>
              {loading ? (
                <div className="spinner-border spinner-border-sm text-white" role="status" />
              ) : (
                <FaSearch className="topic-search-icon" />
              )}
            </button>
          </div>
        </form>

        <div className="mt-5 pt-3 border-top border-secondary">
          <p className="small text-muted mb-3 italic">Popular right now:</p>
          <div className="d-flex flex-wrap justify-content-center gap-2">
            {['JavaScript', 'UI/UX', 'Cloud Computing', 'AI'].map(t => (
              <span
                key={t}
                className="badge glass-card px-3 py-2 cursor-pointer"
                onClick={() => setTopic(t)}
                style={{ cursor: 'pointer' }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TopicSearch;
