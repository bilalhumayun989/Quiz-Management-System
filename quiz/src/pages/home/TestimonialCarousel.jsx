import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { FaTrophy, FaMedal, FaStar } from "react-icons/fa";
import "./testinomals.css";

const testimonials = [
  {
    name: "Adeel Khan",
    role: "React Developer",
    image: "assets/testinomal1.jpg",
    message: "Completed 98 quizzes with an outstanding average score of 97.92%. A consistent top performer in frontend assessments.",
    quizzes: 98,
    avg: "97.92%",
    badge: "🏆",
  },
  {
    name: "Sana Rauf",
    role: "UI/UX Designer",
    image: "assets/testinomals-2.jpg",
    message: "Finished 86 quizzes with an average of 91.45%. Known for precision and visual creativity in problem-solving.",
    quizzes: 86,
    avg: "91.45%",
    badge: "🥇",
  },
  {
    name: "Ali Zafar",
    role: "Backend Developer",
    image: "assets/testinomals-3.jpg",
    message: "Completed 75 quizzes, maintaining a solid average of 88.60%. Excels in logic-based questions and database design.",
    quizzes: 75,
    avg: "88.60%",
    badge: "🥈",
  },
  {
    name: "Hina Tariq",
    role: "Full Stack Developer",
    image: "assets/testinomals-4.jpg",
    message: "Topped 93 quizzes with a sharp average of 95.10%. Skilled in bridging frontend and backend technologies.",
    quizzes: 93,
    avg: "95.10%",
    badge: "🥇",
  },
];

const settings = {
  dots: true,
  infinite: true,
  speed: 700,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  autoplay: true,
  autoplaySpeed: 5000,
};

const TestimonialCarousel = () => {
  return (
    <section className="testi-section">
      {/* Background blobs */}
      <div className="testi-blob testi-blob-1" aria-hidden="true" />
      <div className="testi-blob testi-blob-2" aria-hidden="true" />

      <div className="testi-inner">
        {/* Header */}
        <motion.div
          className="testi-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="testi-badge">
            <FaTrophy className="testi-badge-icon" />
            Top Performers
          </div>
          <h2 className="testi-title">Quiz Achievements</h2>
          <p className="testi-subtitle">Celebrating our most dedicated learners and their milestones</p>
        </motion.div>

        {/* Slider */}
        <motion.div
          className="testi-slider-wrap"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Slider {...settings}>
            {testimonials.map((item, idx) => (
              <div key={idx}>
                <div className="testi-card">
                  {/* Left: avatar + info */}
                  <div className="testi-card-left">
                    <div className="testi-avatar-wrap">
                      <img src={item.image} alt={item.name} className="testi-avatar" />
                      <span className="testi-badge-emoji">{item.badge}</span>
                    </div>
                    <h3 className="testi-name">{item.name}</h3>
                    <p className="testi-role">{item.role}</p>

                    {/* Mini stats */}
                    <div className="testi-mini-stats">
                      <div className="testi-mini-stat">
                        <span className="testi-mini-num">{item.quizzes}</span>
                        <span className="testi-mini-lbl">Quizzes</span>
                      </div>
                      <div className="testi-mini-divider" />
                      <div className="testi-mini-stat">
                        <span className="testi-mini-num">{item.avg}</span>
                        <span className="testi-mini-lbl">Avg Score</span>
                      </div>
                    </div>

                    {/* Stars */}
                    <div className="testi-stars">
                      {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                    </div>
                  </div>

                  {/* Right: quote */}
                  <div className="testi-card-right">
                    <div className="testi-quote-mark">"</div>
                    <p className="testi-quote">{item.message}</p>
                    <div className="testi-accent-line" />
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
