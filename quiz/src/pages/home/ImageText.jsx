import React from 'react';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { FaArrowRight, FaStar, FaUsers, FaTrophy } from 'react-icons/fa';
import "./home.css";

export default function ImageText() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    const token = localStorage.getItem("token");
    navigate(token ? "/quiz" : "/login");
  };

  return (
    <section className="it-section">
      {/* Decorative background blobs */}
      <div className="it-blob it-blob-1" aria-hidden="true" />
      <div className="it-blob it-blob-2" aria-hidden="true" />

      <div className="it-inner">
        {/* ── LEFT: Copy ── */}
        <motion.div
          className="it-copy"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <div className="it-badge">
            <span className="it-badge-dot" />
            Smart Learning Platform
          </div>

          <h2 className="it-title">
            Test prep for <br />
            <span className="it-title-accent">any subject</span>
          </h2>

          <p className="it-desc">
            Memorize anything with personalized practice tests and study sessions.
            Our intelligent system adapts to your unique learning style and pace.
          </p>

          {/* Stats row */}
          <div className="it-stats">
            <div className="it-stat">
              <FaUsers className="it-stat-icon" />
              <div>
                <span className="it-stat-num">98%</span>
                <span className="it-stat-lbl">Student Satisfaction</span>
              </div>
            </div>
            <div className="it-stat-divider" />
            <div className="it-stat">
              <FaTrophy className="it-stat-icon" />
              <div>
                <span className="it-stat-num">10k+</span>
                <span className="it-stat-lbl">Active Quizzes</span>
              </div>
            </div>
          </div>

          <button className="it-btn" onClick={handleGetStarted}>
            Get Started Now
            <FaArrowRight className="it-btn-icon" />
          </button>
        </motion.div>

        {/* ── RIGHT: Image ── */}
        <motion.div
          className="it-visual"
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <div className="it-img-wrap">
            <img
              src="assets/a-landing-page-for-an-intelligent-quiz-s_ZcdWtI8LSLuoZklzK5a9Xw_el02s1qXT2m208o6H4Sy6Q.jpeg"
              alt="Study illustration"
              className="it-img"
            />
            {/* Overlay gradient */}
            <div className="it-img-overlay" />
          </div>

          {/* Floating review card */}
          <motion.div
            className="it-review-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="it-review-stars">
              {[...Array(5)].map((_, i) => <FaStar key={i} />)}
            </div>
            <p className="it-review-text">"The best tool for exam prep I've ever used!"</p>
            <div className="it-review-author">
              <div className="it-review-avatar">A</div>
              <span>Adeel K.</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
