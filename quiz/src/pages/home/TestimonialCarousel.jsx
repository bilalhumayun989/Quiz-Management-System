import React from "react";
import Slider from "react-slick";
import "./testinomals.css";

const TestimonialCarousel = () => {
  const testimonials = [
    {
      name: "Adeel Khan",
      role: "React Developer",
      image: "assets/testinomal1.jpg",
      message: "Completed 98 quizzes with an outstanding average score of 97.92%. A consistent top performer in frontend assessments.",
    },
    {
      name: "Sana Rauf",
      role: "UI/UX Designer",
      image: "assets/testinomals-2.jpg",
      message: "Finished 86 quizzes with an average of 91.45%. Known for precision and visual creativity in problem-solving.",
    },
    {
      name: "Ali Zafar",
      role: "Backend Developer",
      image: "assets/testinomals-3.jpg",
      message: "Completed 75 quizzes, maintaining a solid average of 88.60%. Excels in logic-based questions and database design.",
    },
    {
      name: "Hina Tariq",
      role: "Full Stack Developer",
      image: "assets/testinomals-4.jpg",
      message: "Topped 93 quizzes with a sharp average of 95.10%. Skilled in bridging frontend and backend technologies.",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <section className="testimonial-section">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold fs-1 text-white">Quiz Achievements</h2>
          <p className="text-muted">Celebrating top performers and their dedication</p>
        </div>

        <div className="max-width-800 mx-auto">
          <Slider {...settings}>
            {testimonials.map((item, idx) => (
              <div key={idx}>
                <div className="testimonial-card">
                  <div className="pic">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="testimonial-content">
                    <p className="description">{item.message}</p>
                    <h3 className="testimonial-title">
                      {item.name}
                      <small className="post">{item.role}</small>
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
