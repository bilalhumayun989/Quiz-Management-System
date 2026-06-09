import { useNavigate, Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaUserCircle, FaBars, FaTimes, FaGraduationCap } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [profile, setProfile]           = useState(null);
  const [topic, setTopic]               = useState('');
  const [loading, setLoading]           = useState(false);
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [profileOpen, setProfileOpen]   = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);

  const closeMobile = () => setMobileOpen(false);

  const handleProtectedNav = () => {
    closeMobile();
    navigate(localStorage.getItem('token') ? '/quiz' : '/login');
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return;
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });
      const data = await res.json();
      if (data?.questions) {
        navigate('/show-question', { state: { questions: data.questions, topic } });
        closeMobile();
        setTopic('');
      }
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const openProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    setProfileOpen(true);
    setProfileLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setProfile(data);
    } catch (err) {
      console.error('Profile error:', err);
    } finally {
      setProfileLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setProfileOpen(false);
    setProfile(null);
    navigate('/login');
  };

  return (
    <>
      <div className="navbar-floating-container">
        {/* ── Main bar ── */}
        <motion.div
          className="navbar-bar"
          initial={{ y: -64, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 140, damping: 22 }}
        >
          <div className="navbar-inner">
            {/* Brand */}
            <Link to="/" className="navbar-brand">
              <div className="navbar-brand-icon">
                <FaGraduationCap />
              </div>
              <span className="navbar-brand-name">QuizMaster</span>
            </Link>

            {/* Desktop links */}
            <nav className="navbar-links">
              <Link to="/" className="nav-link">Home</Link>
              <ScrollLink
                to="features-section"
                smooth
                duration={500}
                className="nav-link"
                style={{ cursor: 'pointer' }}
              >
                Features
              </ScrollLink>
              <ScrollLink
                to="dashboard-section"
                smooth
                duration={500}
                className="nav-link"
                style={{ cursor: 'pointer' }}
              >
                Demo
              </ScrollLink>
            </nav>

            {/* Right actions */}
            <div className="navbar-actions">
              {/* Search */}
              <form className="navbar-search-form" onSubmit={handleSearch}>
                <input
                  type="text"
                  className="navbar-search-input"
                  placeholder="Search topic…"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  aria-label="Search topic"
                />
                <button
                  type="submit"
                  className="navbar-search-btn"
                  disabled={loading}
                  aria-label="Submit search"
                >
                  {loading
                    ? <span style={{ width: 12, height: 12, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'nav-spin 0.7s linear infinite' }} />
                    : <FaSearch />
                  }
                </button>
              </form>

              {/* Profile */}
              <button
                className="navbar-profile-btn"
                onClick={openProfile}
                aria-label="Open profile"
              >
                <FaUserCircle />
              </button>

              {/* CTA */}
              <button className="navbar-cta-btn" onClick={handleProtectedNav}>
                Start Quiz
              </button>

              {/* Mobile toggle */}
              <button
                className="navbar-mobile-toggle"
                onClick={() => setMobileOpen((o) => !o)}
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── Mobile drawer ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="navbar-mobile-drawer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: 'easeInOut' }}
            >
              <div className="navbar-mobile-inner">
                <Link to="/" className="mobile-nav-link" onClick={closeMobile}>Home</Link>
                <ScrollLink
                  to="features-section"
                  smooth
                  duration={500}
                  className="mobile-nav-link"
                  onClick={closeMobile}
                  style={{ cursor: 'pointer' }}
                >
                  Features
                </ScrollLink>
                <ScrollLink
                  to="dashboard-section"
                  smooth
                  duration={500}
                  className="mobile-nav-link"
                  onClick={closeMobile}
                  style={{ cursor: 'pointer' }}
                >
                  Demo
                </ScrollLink>

                {/* Mobile search */}
                <form className="mobile-search-form" onSubmit={handleSearch}>
                  <input
                    type="text"
                    className="mobile-search-input"
                    placeholder="Search a topic…"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    aria-label="Search topic"
                  />
                  <button
                    type="submit"
                    className="mobile-search-btn"
                    disabled={loading}
                    aria-label="Submit search"
                  >
                    <FaSearch />
                  </button>
                </form>

                <button className="mobile-cta-btn" onClick={handleProtectedNav}>
                  Start Quiz
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Profile modal ── */}
      <AnimatePresence>
        {profileOpen && (
          <motion.div
            className="profile-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => { if (e.target === e.currentTarget) setProfileOpen(false); }}
          >
            <motion.div
              className="profile-modal-box"
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <button
                className="profile-modal-close"
                onClick={() => setProfileOpen(false)}
                aria-label="Close profile"
              >
                <FaTimes />
              </button>

              {profileLoading ? (
                <div className="profile-modal-spinner">
                  <span className="profile-spinner" />
                </div>
              ) : profile ? (
                <>
                  <div className="profile-modal-avatar">
                    {profile.image
                      ? <img src={profile.image} alt="Avatar" />
                      : <FaUserCircle />
                    }
                  </div>
                  <p className="profile-modal-name">{profile.name}</p>
                  <p className="profile-modal-email">{profile.email}</p>
                  <button className="profile-modal-logout" onClick={handleLogout}>
                    Sign out
                  </button>
                </>
              ) : (
                <p style={{ textAlign: 'center', color: '#5F5F60', fontSize: 14 }}>
                  Could not load profile.
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
