import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import "./quiz.css";
import {
  FaLaptopCode, FaBookOpen, FaBalanceScale, FaCalculator,
  FaAtom, FaLandmark, FaGlobeAmericas, FaFeatherAlt
} from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

const fields = [
  {
    title: "Computer Science",
    description: "Test your knowledge in programming, algorithms, data structures, and more.",
    icon: <FaLaptopCode className="text-primary" />,
  },
  {
    title: "English",
    description: "Improve your grammar, vocabulary, and comprehension skills.",
    icon: <FaBookOpen className="text-success" />,
  },
  {
    title: "Law",
    description: "Challenge yourself with legal concepts, precedents, and constitutional knowledge.",
    icon: <FaBalanceScale className="text-warning" />,
  },
  {
    title: "Mathematics",
    description: "Solve problems in algebra, calculus, geometry, and statistical analysis.",
    icon: <FaCalculator className="text-danger" />,
  },
  {
    title: "Science",
    description: "Explore physics, chemistry, biology, and other scientific disciplines.",
    icon: <FaAtom className="text-info" />,
  },
  {
    title: "History",
    description: "Test your knowledge about world events, civilizations, and important figures.",
    icon: <FaLandmark className="text-secondary" />,
  },
  {
    title: "Geography",
    description: "Challenge yourself with questions about countries, landmarks, and natural features.",
    icon: <FaGlobeAmericas className="text-light" />,
  },
  {
    title: "Literature",
    description: "Explore famous works, authors, and literary techniques from around the world.",
    icon: <FaFeatherAlt style={{ color: "#a855f7" }} />,
  },
];

const Quiz = () => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchQuestions = async (selectedTopic) => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: selectedTopic }),
      });

      const data = await res.json();
      if (data && data.questions) {
        navigate('/show-question', { state: { questions: data.questions, topic: selectedTopic } });
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!topic) return;
    await fetchQuestions(topic);
  };

  const handleCardClick = async (title) => {
    await fetchQuestions(title);
  };

  return (
    <div className="quiz-app">
      <motion.header
        className="text-center header-section"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="display-4">Explore Knowledge Fields</h1>
        <p className="lead">Choose a field and test your knowledge with our intelligent quiz system.</p>
        <p className="text-muted small">Learn, compete, and grow your expertise in various domains.</p>
      </motion.header>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <form className="custom-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for a field..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
          />
          <button type="submit" className="search-btn" disabled={loading}>
            {loading ? (
              <div className="spinner-border spinner-border-sm text-white" role="status" />
            ) : (
              <FiSearch className="search-icon" />
            )}
          </button>
        </form>
      </motion.div>

      {/* Card Grid */}
      <div className="container pb-5">
        {loading && (
          <div className="text-center my-3">
            <div className="spinner-border text-primary" role="status" />
            <p className="text-muted mt-2">Generating questions...</p>
          </div>
        )}
        <div className="row g-4">
          {!loading && fields.map((field, index) => (
            <div className="col-md-6 col-lg-4 col-xl-3" key={index}>
              <motion.div
                className="quiz-card"
                onClick={() => handleCardClick(field.title)}
                style={{ cursor: 'pointer' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 + 0.5 }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="fs-1">{field.icon}</div>
                <h5>{field.title}</h5>
                <p className="text-center mb-0">{field.description}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
