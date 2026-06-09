import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaBrain, FaChartLine, FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import './home.css';

export default function HomeHero() {
  const navigate = useNavigate();

  const handleStartNow = () => {
    const token = localStorage.getItem('token');
    navigate(token ? '/quiz' : '/login');
  };

  const floatUp = {
    animate: {
      y: [0, -12, 0],
      transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
    },
  };

  const floatDown = {
    animate: {
      y: [0, 12, 0],
      transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
    },
  };

  return (
    <section className="hero-section">
      {/* subtle background texture dots */}
      <div className="hero-dots" aria-hidden="true" />

      <div className="hero-inner">
        {/* ── LEFT: Copy ── */}
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          {/* Badge */}
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            AI-Powered Learning
          </div>

          <h1 className="hero-title">
            Master any topic with{' '}
            <span className="hero-title-accent">intelligent quizzes</span>
          </h1>

          <p className="hero-subtitle">
            Adaptive quizzes that learn your pace, real-time performance
            insights, and a personalised experience built around you.
          </p>

          {/* Stats row */}
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-number">50K+</span>
              <span className="hero-stat-label">Active learners</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="hero-stat-number">200+</span>
              <span className="hero-stat-label">Topics</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="hero-stat-number">98%</span>
              <span className="hero-stat-label">Satisfaction</span>
            </div>
          </div>

          {/* CTA */}
          <div className="hero-actions">
            <button className="hero-btn-primary" onClick={handleStartNow}>
              Start your journey
              <FaArrowRight className="hero-btn-icon" />
            </button>
            <button
              className="hero-btn-secondary"
              onClick={() => {
                document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              See how it works
            </button>
          </div>

          {/* Trust line */}
          <div className="hero-trust">
            <FaCheckCircle className="hero-trust-icon" />
            <span>Free to start — no credit card required</span>
          </div>
        </motion.div>

        {/* ── RIGHT: Visual ── */}
        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
        >
          {/* Central card */}
          <div className="hero-central-card">
            <div className="hero-central-top">
              <div className="hero-avatar">S</div>
              <div>
                <p className="hero-card-name">Sarah K.</p>
                <p className="hero-card-sub">Top learner this week</p>
              </div>
            </div>

            <div className="hero-score-row">
              <div className="hero-score-item">
                <span className="hero-score-val">92%</span>
                <span className="hero-score-lbl">Avg. score</span>
              </div>
              <div className="hero-score-item">
                <span className="hero-score-val">27</span>
                <span className="hero-score-lbl">Quizzes done</span>
              </div>
              <div className="hero-score-item">
                <span className="hero-score-val">5</span> { /* 🔥 */}
                <span className="hero-score-lbl">Day streak</span>
              </div>
            </div>

            {/* Mini progress bars */}
            <div className="hero-progress-list">
              {[
                { label: 'Mathematics', pct: 92 },
                { label: 'Biology', pct: 78 },
                { label: 'History', pct: 85 },
              ].map(({ label, pct }) => (
                <div className="hero-progress-row" key={label}>
                  <span className="hero-progress-label">{label}</span>
                  <div className="hero-progress-track">
                    <motion.div
                      className="hero-progress-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
                    />
                  </div>
                  <span className="hero-progress-pct">{pct}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Floating chip — top left */}
          {/* <motion.div className="hero-chip chip-tl" variants={floatUp} animate="animate">
            <div className="hero-chip-icon chip-blue">
              <FaBrain />
            </div>
            <div>
              <p className="hero-chip-title">Adaptive AI</p>
              <p className="hero-chip-sub">Learns your pace</p>
            </div>
          </motion.div> */}

          {/* Floating chip — bottom right */}
          {/* <motion.div className="hero-chip chip-br" variants={floatDown} animate="animate">
            <div className="hero-chip-icon chip-dark">
              <FaChartLine />
            </div>
            <div>
              <p className="hero-chip-title">Live Insights</p>
              <p className="hero-chip-sub">Detailed reports</p>
            </div>
          </motion.div> */}
        </motion.div>
      </div>
    </section>
  );
}
