import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaGraduationCap } from 'react-icons/fa';
import './signup.css';
import API_BASE from '../../api';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.user._id);
        localStorage.setItem('userName', data.user.name);
        navigate('/dashboard/overview');
      } else {
        setMessage(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setMessage('Server error. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* ── Left Branding Panel ── */}
      <div className="auth-left">
        <div className="auth-left-bg" />
        <div className="auth-left-inner">
          {/* Brand */}
          <div className="auth-brand">
            <div className="auth-brand-icon">
              <FaGraduationCap />
            </div>
            <span className="auth-brand-name">QuizMaster</span>
          </div>

          <h1>
            Learn smarter,<br />
            <span>not harder.</span>
          </h1>

          <p className="auth-left-desc">
            Test your knowledge, track your progress, and master any topic
            with AI-powered quizzes built for you.
          </p>

          {/* <div className="auth-stats">
            <div className="auth-stat-item">
              <span className="auth-stat-number">50K+</span>
              <span className="auth-stat-label">Active learners</span>
            </div>
            <div className="auth-stat-item">
              <span className="auth-stat-number">200+</span>
              <span className="auth-stat-label">Topics covered</span>
            </div>
            <div className="auth-stat-item">
              <span className="auth-stat-number">98%</span>
              <span className="auth-stat-label">Satisfaction rate</span>
            </div>
          </div> */}
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="auth-divider" />

      {/* ── Right Form Panel ── */}
      <div className="auth-right">
        <motion.div
          className="auth-form-container"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className="auth-form-header">
            <h2>Welcome back</h2>
            <p>Sign in to continue your learning journey</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div className="auth-field">
              <label htmlFor="login-email">Email address</label>
              <div className="auth-input-wrap">
                <FaEnvelope className="auth-input-icon" />
                <input
                  id="login-email"
                  type="email"
                  name="email"
                  className="auth-input"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="auth-field">
              <div className="auth-field-row">
                <label htmlFor="login-password">Password</label>
                <Link to="#" className="auth-forgot">Forgot password?</Link>
              </div>
              <div className="auth-input-wrap">
                <FaLock className="auth-input-icon" />
                <input
                  id="login-password"
                  type="password"
                  name="password"
                  className="auth-input"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                />
              </div>
            </div>

            {/* Remember me */}
            <div className="auth-remember">
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe">Remember me for 30 days</label>
            </div>

            {/* Error message */}
            {message && (
              <motion.div
                className="auth-alert auth-alert-error"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {message}
              </motion.div>
            )}

            {/* Submit */}
            <button type="submit" className="auth-submit-btn" disabled={isLoading}>
              {isLoading ? (
                <span className="auth-spinner" role="status" aria-label="Loading" />
              ) : null}
              {isLoading ? 'Signing in…' : 'Sign in'}
            </button>

            {/* Separator */}
            <div className="auth-separator">
              <span>or</span>
            </div>

            {/* Footer */}
            <p className="auth-footer-text">
              Don't have an account?{' '}
              <Link to="/signup">Create account</Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
