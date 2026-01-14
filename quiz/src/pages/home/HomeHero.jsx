import React from 'react';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import './home.css';

export default function HomeHero() {
  const navigate = useNavigate();

  const handleStartNow = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate('/quiz');
    } else {
      navigate('/login');
    }
  };

  return (
    <section className="hero-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="hero-title"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            Intelligent Quiz System <br />
            <span>for Personalized Learning</span>
          </motion.h1>

          <motion.p
            className="hero-subtitle lead"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Empower your educational journey with AI-driven adaptive quizzes,
            real-time performance insights, and a personalized learning experience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <button
              className="btn btn-primary-custom px-5 py-3 fs-5"
              onClick={handleStartNow}
            >
              Start Your Journey
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
