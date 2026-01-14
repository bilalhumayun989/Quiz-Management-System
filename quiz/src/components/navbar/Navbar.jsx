import { useNavigate, Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import * as bootstrap from 'bootstrap';
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleProtectedNavigation = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/quiz");
    } else {
      navigate("/login");
    }
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });

      const data = await res.json();
      if (data && data.questions) {
        navigate('/show-question', { state: { questions: data.questions, topic } });
        setIsMobileMenuOpen(false);
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    try {
      const res = await fetch("http://localhost:5000/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setProfile(data);
      // Using Bootstrap modal via JS
      const modalElement = document.getElementById("profileModal");
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <div className="navbar-floating-container">
        <motion.nav
          className="navbar-pill"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        >
          {/* Logo */}
          <Link to="/" className="navbar-brand-pill">
            <span className="brand-dot"></span>
            Quiz<span className="text-highlight">System</span>
          </Link>

          {/* Desktop Links */}
          <div className="navbar-links-desktop">
            <Link to="/" className="nav-link-pill">Home</Link>
            <ScrollLink
              to="features-section"
              smooth={true}
              duration={500}
              className="nav-link-pill"
            >
              Features
            </ScrollLink>
            <button onClick={handleProtectedNavigation} className="nav-link-pill btn-link">
              Start Quiz
            </button>
          </div>

          {/* Search & Profile */}
          <div className="navbar-actions">
            <div className="search-pill-wrapper">
              <form onSubmit={handleSearchSubmit}>
                <button type="submit" className="search-icon-btn" disabled={loading}>
                  <FaSearch />
                </button>
                <input
                  type="text"
                  placeholder="Topic..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="search-pill-input"
                />
              </form>
            </div>

            <button className="profile-pill-btn" onClick={fetchProfile} aria-label="Profile">
              <FaUserCircle size={20} />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </motion.nav>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="mobile-menu-dropdown"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              <Link to="/" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <ScrollLink
                to="features-section"
                smooth={true}
                duration={500}
                className="mobile-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </ScrollLink>
              <button
                onClick={() => { handleProtectedNavigation(); setIsMobileMenuOpen(false); }}
                className="mobile-link btn-link"
              >
                Start Quiz
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Profile Modal (Bootstrap) */}
      <div className="modal fade" id="profileModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content glass-modal">
            <div className="modal-header border-0">
              <h5 className="modal-title fw-bold text-white">Your Profile</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body text-center text-white">
              {profile ? (
                <div className="d-flex flex-column align-items-center">
                  <div className="profile-avatar mb-3">
                    {profile.image ? (
                      <img src={profile.image} alt="Avatar" />
                    ) : (
                      <FaUserCircle size={60} />
                    )}
                  </div>
                  <h4 className="mb-1">{profile.name}</h4>
                  <p className="text-muted mb-4">{profile.email}</p>
                  <button className="btn btn-danger w-100 rounded-pill" onClick={handleLogout}>
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="spinner-border text-primary" role="status" />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
