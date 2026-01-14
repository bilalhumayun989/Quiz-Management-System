import React from 'react';
import './footer.css';
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaPinterestP,
  FaDribbble
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer text-center">
      <div className="footer-unique-top">
        <div className="footer-unique-section footer-unique-about">
          <div className="footer-unique-logo">
            <img src="assets/logo-footer.png" alt="QuizApp Logo" />
          </div>
          <p className="footer-unique-description">
            We empower learners with intelligent tools to transform their educational journey
            through adaptive quizzes and real-time insights.
          </p>
        </div>

        <div className="footer-unique-section footer-unique-links">
          <h4 className="footer-unique-heading">Quick Links</h4>
          <nav className="footer-unique-nav">
            <ul className="footer-unique-navlist">
              <li className="footer-unique-navitem">
                <Link className="footer-unique-link active" to="/">Home</Link>
              </li>
              <li className="footer-unique-navitem">
                <ScrollLink
                  to="features-section"
                  smooth={true}
                  duration={500}
                  offset={-70}
                  className="footer-unique-link"
                >
                  Features
                </ScrollLink>
              </li>
              <li className="footer-unique-navitem">
                <Link className="footer-unique-link" to="/signup">Join Now</Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="footer-unique-section footer-unique-social">
          <h4 className="footer-unique-heading">Stay in Touch</h4>
          <div className="footer-unique-icons">
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaPinterestP /></a>
            <a href="#"><FaDribbble /></a>
          </div>
        </div>
      </div>

      <div className="footer-unique-bottom">
        <p className="footer-unique-copyright">
          © {new Date().getFullYear()} QuizApp. All rights reserved.
        </p>
        <div className="footer-unique-legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Careers</a>
          <a href="#">Support</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
