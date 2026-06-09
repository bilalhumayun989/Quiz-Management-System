import React from 'react';
import './footer.css';
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaGithub,
  FaArrowRight,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="ft">

      {/* ── CTA BAND ── */}
      <div className="ft-cta">
        <div className="ft-cta-inner">
          <div className="ft-cta-copy">
            <h2 className="ft-cta-title">Ready to master any topic?</h2>
            <p className="ft-cta-sub">Join thousands of learners already using QuizApp.</p>
          </div>
          <Link to="/signup" className="ft-cta-btn">
            Get Started Free <FaArrowRight className="ft-cta-btn-icon" />
          </Link>
        </div>
      </div>

      {/* ── MAIN GRID ── */}
      <div className="ft-main">

        {/* Brand column */}
        <div className="ft-col ft-col-brand">
          <img src="assets/logo-footer.png" alt="QuizApp" className="ft-logo" />
          <p className="ft-brand-desc">
            Intelligent quizzes and real-time insights to power your learning journey — anytime, anywhere.
          </p>
          <div className="ft-socials">
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a>
            <a href="#" aria-label="GitHub"><FaGithub /></a>
          </div>
        </div>

        {/* Product column */}
        <div className="ft-col">
          <h4 className="ft-col-heading">Product</h4>
          <ul className="ft-link-list">
            <li><ScrollLink to="features-section" smooth duration={500} offset={-70} className="ft-link">Features</ScrollLink></li>
            <li><Link className="ft-link" to="/quiz">Browse Quizzes</Link></li>
            <li><Link className="ft-link" to="/signup">Get Started</Link></li>
            <li><Link className="ft-link" to="/login">Sign In</Link></li>
          </ul>
        </div>

        {/* Company column */}
        <div className="ft-col">
          <h4 className="ft-col-heading">Company</h4>
          <ul className="ft-link-list">
            <li><a href="#" className="ft-link">About Us</a></li>
            <li><a href="#" className="ft-link">Careers</a></li>
            <li><a href="#" className="ft-link">Blog</a></li>
            <li><a href="#" className="ft-link">Support</a></li>
          </ul>
        </div>

        {/* Legal column */}
        <div className="ft-col">
          <h4 className="ft-col-heading">Legal</h4>
          <ul className="ft-link-list">
            <li><a href="#" className="ft-link">Privacy Policy</a></li>
            <li><a href="#" className="ft-link">Terms of Service</a></li>
            <li><a href="#" className="ft-link">Cookie Policy</a></li>
            <li><a href="#" className="ft-link">Accessibility</a></li>
          </ul>
        </div>

      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="ft-bottom">
        <div className="ft-bottom-inner">
          <p className="ft-copyright">© {new Date().getFullYear()} QuizApp. All rights reserved.</p>
          <p className="ft-made">Made with ♥ for learners everywhere</p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
