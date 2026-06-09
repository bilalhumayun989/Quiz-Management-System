import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock, FaGraduationCap } from 'react-icons/fa';
import './signup.css';

const SignupPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ text: 'Account created! You can now sign in.', type: 'success' });
        setFormData({ name: '', email: '', password: '' });
      } else {
        setMessage({ text: data.message || 'Signup failed. Please try again.', type: 'error' });
      }
    } catch (error) {
      console.error('Signup error:', error);
      setMessage({ text: 'Server error. Please try again.', type: 'error' });
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
            Start your<br />
            <span>learning journey.</span>
          </h1>

          <p className="auth-left-desc">
            Join thousands of learners who use QuizMaster to build knowledge,
            prepare for exams, and stay sharp every day.
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
              <span className="auth-stat-number">Free</span>
              <span className="auth-stat-label">Always</span>
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
            <h2>Create your account</h2>
            <p>It's free and takes less than a minute</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {/* Full Name */}
            <div className="auth-field">
              <label htmlFor="signup-name">Full name</label>
              <div className="auth-input-wrap">
                <FaUser className="auth-input-icon" />
                <input
                  id="signup-name"
                  type="text"
                  name="name"
                  className="auth-input"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                />
              </div>
            </div>

            {/* Email */}
            <div className="auth-field">
              <label htmlFor="signup-email">Email address</label>
              <div className="auth-input-wrap">
                <FaEnvelope className="auth-input-icon" />
                <input
                  id="signup-email"
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
              <label htmlFor="signup-password">Password</label>
              <div className="auth-input-wrap">
                <FaLock className="auth-input-icon" />
                <input
                  id="signup-password"
                  type="password"
                  name="password"
                  className="auth-input"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
                />
              </div>
            </div>

            {/* Message */}
            {message.text && (
              <motion.div
                className={`auth-alert ${message.type === 'success' ? 'auth-alert-success' : 'auth-alert-error'}`}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {message.text}
              </motion.div>
            )}

            {/* Submit */}
            <button type="submit" className="auth-submit-btn" disabled={isLoading}>
              {isLoading ? (
                <span className="auth-spinner" role="status" aria-label="Loading" />
              ) : null}
              {isLoading ? 'Creating account…' : 'Create account'}
            </button>

            {/* Separator */}
            <div className="auth-separator">
              <span>or</span>
            </div>

            {/* Footer */}
            <p className="auth-footer-text">
              Already have an account?{' '}
              <Link to="/login">Sign in</Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default SignupPage;
