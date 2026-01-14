import { motion } from "framer-motion";
import "./home.css"; 

import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
    description:
      "Track your progress with intuitive analytics and visualizations that highlight strengths and areas for improvement.",
    icon: <FaChartBar />,
  },
  {
    title: "Real-time Feedback",
    description:
      "Receive immediate guidance on your answers to reinforce knowledge and correct misunderstandings.",
    icon: <FaClock />,
  },
  {
    title: "Adaptive Learning",
    description:
      "Experience quizzes that adjust to your knowledge level, ensuring optimal challenge and engagement.",
    icon: <FaBrain />,
  },
  {
    title: "Secure Management",
    description:
      "JWT-based authentication ensures content and user data remain protected and accessible only to authorized users.",
    icon: <FaLock />,
  },
  {
    title: "Cross-platform Access",
    description:
      "Access your quizzes and learning materials from any device, anywhere, anytime.",
    icon: <FaMobileAlt />,
  },
  {
    title: "Data-driven Insights",
    description:
      "Leverage comprehensive analytics to inform teaching strategies and enhance learning outcomes.",
    icon: <FaChartLine />,
  },
];

function Home({ type = "C", text = "ENTRY" }) {
   // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    hover: {
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
    tap: { scale: 0.98 },
  };

  const pricingPlans = [
    {
      tier: "Basic",
      price: "Free",
      features: [
        "5 Quizzes per month",
        "Basic analytics",
        "Email support",
        "Mobile access",
        "",
      ],
      buttonText: "Get Started",
      color: "#2f98dc",
    },
    {
      tier: "Pro",
      price: "$12/month",
      features: [
        "Unlimited quizzes",
        "Advanced analytics",
        "Priority support",
        "Mobile access",
        "Custom learning paths",
      ],
      buttonText: "Get Started",
      color: "#2f98dc",
    },
    {
      tier: "Enterprise",
      price: "Custom",
      features: [
        "Unlimited everything",
        "Advanced analytics & API",
        "24/7 dedicated support",
        "Custom integrations",
        "Onboarding training",
      ],
      buttonText: "Contact Us",
      color: "#2f98dc",
    },
  ];

  const getButtonClass = () => {
    switch (type) {
      case "A":
        return "button-type-A";
      case "B":
        return "button-type-B";
      case "C":
      default:
        return "button-type-C";
    }
  };

  return (
    <div>
      {/* Hero Section */}
        <motion.header
      className="bg-light text-center py-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="container py-5">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
        >
          Intelligent Quiz System for Personalized Learning
        </motion.h1>

        <motion.p
          className="lead"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
        >
          Boost engagement and knowledge retention with our smart, interactive quiz platform.
        </motion.p>

        <Link to="/login">
      <motion.button
        className="btn btn-primary"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        Start Now
      </motion.button>
    </Link>
      </div>
    </motion.header>

      <section className="py-5 bg-white">
        <div className="container">
          <div className="row align-items-center">
            {/* Left Text Section */}
            <motion.div
              className="col-md-6 mb-4 mb-md-0"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.h2
                className="fw-bold mb-3 display-5"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Test prep for any subject
              </motion.h2>

              <motion.p
                className="lead mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Memorize anything with personalized practice tests and study
                sessions in Learn.
                <br />
                <motion.strong
                  className="text-primary"
                  initial={{ scale: 0.9 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.8, type: "spring" }}
                >
                  98% of students
                </motion.strong>{" "}
                say Quizlet has improved their understanding.
              </motion.p>

 <motion.div
  className="d-flex justify-content-start align-items-center"
  style={{ height: "120px" }}
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.8 }}
>
  <Link to="/quiz" className={`animated-button ${getButtonClass()}`}>
    <div className="button__line button__line--left"></div>
    <div className="button__line button__line--right"></div>
    <span className="button__text">Get Started</span>
    <div className="button__drow button__drow1"></div>
    <div className="button__drow button__drow2"></div>
  </Link>
</motion.div>
            </motion.div>

            {/* Right Image Section */}
            <motion.div
              className="col-md-6 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                scale: { type: "spring", damping: 10 },
              }}
              viewport={{ once: true }}
            >
              <motion.img
                src="assets/a-landing-page-for-an-intelligent-quiz-s_ZcdWtI8LSLuoZklzK5a9Xw_el02s1qXT2m208o6H4Sy6Q.jpeg"
                alt="Study illustration"
                className="img-fluid rounded-4 shadow-lg"
                style={{ maxHeight: "400px" }}
                whileHover={{
                  scale: 1.03,
                  transition: { duration: 0.3 },
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section   id="features-section" className="py-5 bg-white text-center">
        <div className="container">
          <h2 className="mb-4 fw-bold">Powerful Features</h2>
          <div className="row mt-4 py-5">
            {features.map((feature, idx) => (
              <motion.div
                className="col-md-4 mb-4"
                key={idx}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: idx * 0.3,
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                }}
                whileHover={{
                  scale: 1.05,
                  rotate: idx % 2 === 0 ? 5 : -5,
                  boxShadow: "0 10px 20px rgba(111, 66, 193, 0.3)",
                  transition: { duration: 0.3 },
                }}
              >
                <div className="card p-4 border-0 shadow-sm h-100">
                  <div
                    className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
                    style={{
                      width: "60px",
                      height: "60px",
                      background: "linear-gradient(135deg, #6f42c1, #6610f2)",
                      color: "#fff",
                      fontSize: "24px",
                    }}
                  >
                    {feature.icon}
                  </div>

                  <h5 className="fw-bold">{feature.title}</h5>
                  <p className="text-muted">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
 <div id="dashboard-section" className="student-dashboard-container px-5">
  <h1 className="student-dashboard-title">See It In Action</h1>
  <p className="student-dashboard-subtitle">
    Experience how our intelligent quiz system transforms learning through
    personalization and instant feedback.
  </p>

  <div className="student-dashboard-divider"></div>

  <div className="student-dashboard-content-wrapper">
    {/* Left side content */}
    <div className="student-dashboard-left-content">
      <h2 className="student-dashboard-section-title">Student Dashboard Preview</h2>
      <p className="student-dashboard-description">
        Our intuitive dashboard provides students with a clear overview of
        their learning journey, highlighting achievements and suggesting
        areas for focus. With personalized quiz recommendations based on
        performance data, students can efficiently target knowledge gaps
        and strengthen their understanding.
      </p>
      <Link to="/dashbord">
        <button className="demo-button">Try Demo</button>
      </Link>
    </div>

    {/* Right side dashboard card */}
    <div className="student-dashboard-right-content">
      <div className="student-dashboard-card">
        <div className="student-dashboard-header">
          <h3>Welcome, Sarah!</h3>
        </div>

        <div className="student-dashboard-stats-row">
          <div className="student-dashboard-stat-box">
            <div className="student-dashboard-stat-label">Quizzes Completed</div>
            <div className="student-dashboard-stat-value">27</div>
          </div>
          <div className="student-dashboard-stat-box">
            <div className="student-dashboard-stat-label">Average Score</div>
            <div className="student-dashboard-stat-value">84%</div>
          </div>
        </div>

        <div className="student-dashboard-streak-container">
          <div className="student-dashboard-streak-label">Streak</div>
          <div className="student-dashboard-streak-value">5 days</div>
        </div>

        <div className="student-dashboard-recent-quizzes">
          <h4>Recent Quizzes</h4>
          <div className="student-dashboard-quiz-table">
            <div className="student-dashboard-quiz-row">
              <div className="student-dashboard-quiz-name">Advanced Mathematics</div>
              <div className="student-dashboard-quiz-score">92%</div>
              <div className="student-dashboard-quiz-date">Completed yesterday</div>
            </div>
            <div className="student-dashboard-quiz-row">
              <div className="student-dashboard-quiz-name">Biology Fundamentals</div>
              <div className="student-dashboard-quiz-score">78%</div>
              <div className="student-dashboard-quiz-date">Completed 3 days ago</div>
            </div>
            <div className="student-dashboard-quiz-row">
              <div className="student-dashboard-quiz-name">World History</div>
              <div className="student-dashboard-quiz-score">88%</div>
              <div className="student-dashboard-quiz-date">Completed 5 days ago</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

      {/* Testimonials Section */}
     <TestimonialCarousel />

      {/* Pricing Section */}
      <section className="pricing-section">
        <div className="pricing-container">
          <motion.h2
            className="pricing-title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Simple, Transparent Pricing
          </motion.h2>

          <motion.p
            className="pricing-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Choose the plan that best fits your learning needs or institutional
            requirements.
          </motion.p>

          <motion.div
            className="pricing-cards"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                className="pricing-card"
                variants={cardVariants}
                whileHover="hover"
              >
                <h3 className="plan-tier">{plan.tier}</h3>
                <motion.p
                  className="plan-price"
                   initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: "spring" }}
                >
                  {plan.price}
                </motion.p>
                <ul className="plan-features">
                  {plan.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    >
                      {feature}
                    </motion.li>
                  ))}
                </ul>
                <motion.button
                  className="plan-button"
                  style={{ backgroundColor: plan.color }}
                  variants={buttonVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                >
                  {plan.buttonText}
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
 <section
  id="contact"
  className="py-5 d-flex justify-content-center"
  style={{ width: "100%" }}
>
  <div className="container" style={{ maxWidth: "600px" }}>
    <h2 className="text-center">Get In Touch</h2>
    <form className="mt-4">
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Your name"
        required 
              />
      <input
        type="email"
        className="form-control mb-2"
        placeholder="Your email"
        required
      />
      <textarea
        className="form-control mb-2"
        rows="4"
        placeholder="Your message"
      ></textarea>
      <div className="text-start">
        <button type="submit" className="btn btn-primary">
          Send Message
        </button>
      </div>
    </form>
  </div>
</section>


 
    </div>
  );
}

export default Home;
