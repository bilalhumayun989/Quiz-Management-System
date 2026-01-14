import React from 'react';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import "./home.css";

export default function ImageText() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/quiz");
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="image-text-section bg-transparent">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Text Section */}
          <motion.div
            className="col-md-6 mb-5 mb-md-0"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="fw-bold mb-4 fs-1 text-white">
              Test prep for any <span className="text-primary">subject</span>
            </h2>

            <p className="lead mb-4 text-muted">
              Memorize anything with personalized practice tests and study sessions in Learn.
              Our intelligent system adapts to your unique learning style.
            </p>

            <div className="d-flex align-items-center gap-3 mb-5">
              <div className="p-3 glass-card text-center" style={{ flex: 1 }}>
                <h4 className="text-primary mb-1">98%</h4>
                <p className="small text-muted mb-0">Student Satisfaction</p>
              </div>
              <div className="p-3 glass-card text-center" style={{ flex: 1 }}>
                <h4 className="text-secondary mb-1">10k+</h4>
                <p className="small text-muted mb-0">Active Quizzes</p>
              </div>
            </div>

            <button
              className="btn btn-primary-custom"
              onClick={handleGetStarted}
            >
              Get Started Now
            </button>
          </motion.div>

          {/* Right Image Section */}
          <motion.div
            className="col-md-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="image-text-image">
              <img
                src="assets/a-landing-page-for-an-intelligent-quiz-s_ZcdWtI8LSLuoZklzK5a9Xw_el02s1qXT2m208o6H4Sy6Q.jpeg"
                alt="Study illustration"
                className="img-fluid"
              />
              <div
                className="position-absolute glass-card p-3"
                style={{ bottom: '-20px', right: '20px', maxWidth: '200px' }}
              >
                <p className="mb-0 small text-light">"The best tool for exam preparation I've ever used!"</p>
                <div className="text-secondary small mt-1">★★★★★</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
