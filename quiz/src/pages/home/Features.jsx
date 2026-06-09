import React from 'react';
import { motion } from "framer-motion";
import "./home.css";
import {
  FaChartBar,
  FaClock,
  FaBrain,
  FaLock,
  FaMobileAlt,
  FaChartLine,
} from "react-icons/fa";

const features = [
  {
    title: "Personalized Dashboard",
    description: "Track your progress with intuitive analytics that highlight strengths and areas for improvement.",
    icon: <FaChartBar />,
  },
  {
    title: "Real-time Feedback",
    description: "Receive immediate guidance on your answers to reinforce knowledge and correct misunderstandings.",
    icon: <FaClock />,
  },
  {
    title: "Adaptive Learning",
    description: "Experience quizzes that adjust to your knowledge level, ensuring optimal challenge and engagement.",
    icon: <FaBrain />,
  },
  {
    title: "Secure Management",
    description: "JWT-based authentication ensures content and user data remain protected and private.",
    icon: <FaLock />,
  },
  {
    title: "Cross-platform Access",
    description: "Access your quizzes and learning materials from any device, anywhere, anytime.",
    icon: <FaMobileAlt />,
  },
  {
    title: "Data-driven Insights",
    description: "Leverage comprehensive analytics to enhance learning outcomes and teaching strategies.",
    icon: <FaChartLine />,
  },
];

export default function Features() {
  return (
    <section id="features-section" className="feat-section">
      <div className="feat-inner">
        {/* Header */}
        <motion.div
          className="feat-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="feat-badge">Why QuizMaster?</div>
          <h2 className="feat-title">Powerful Features</h2>
          <p className="feat-subtitle">Everything you need to excel in your learning journey</p>
        </motion.div>

        {/* Cards grid */}
        <div className="feat-grid">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              className="feat-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
            >
              <div className="feat-icon">
                {feature.icon}
              </div>
              <h3 className="feat-card-title">{feature.title}</h3>
              <p className="feat-card-desc">{feature.description}</p>
              <div className="feat-card-line" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
