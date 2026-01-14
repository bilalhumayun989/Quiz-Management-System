import React from 'react'
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

export default function Features() {
  const features = [
    {
      title: "Personalized Dashboard",
      description: "Track your progress with intuitive analytics and visualizations that highlight strengths and areas for improvement.",
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
      description: "JWT-based authentication ensures content and user data remain protected and accessible only to authorized users.",
      icon: <FaLock />,
    },
    {
      title: "Cross-platform Access",
      description: "Access your quizzes and learning materials from any device, anywhere, anytime.",
      icon: <FaMobileAlt />,
    },
    {
      title: "Data-driven Insights",
      description: "Leverage comprehensive analytics to inform teaching strategies and enhance learning outcomes.",
      icon: <FaChartLine />,
    },
  ];

  return (
    <section id="features-section" className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <motion.h2
            className="fw-bold fs-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Powerful Features
          </motion.h2>
          <p className="text-muted">Everything you need to excel in your learning journey</p>
        </div>

        <div className="features-grid">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              className="feature-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="feature-icon">
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
