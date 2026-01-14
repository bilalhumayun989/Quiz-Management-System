import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "./signup.css";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Registration successful! You can now log in.");
        setFormData({ name: '', email: '', password: '' });
      } else {
        setMessage(data.message || "Signup failed.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setMessage("Server error. Please try again.");
    }
  };

  return (
    <div className="container-fluid signup-page d-flex align-items-center justify-content-center">
      <div className="col-md-6 d-flex align-items-center justify-content-center">
        <div className="signup-box p-5 rounded shadow">
          <h2>
            <strong>Lets</strong>
            <br />
            Start Learning
          </h2>
          <p className="text-muted">Please sign up to continue</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Your Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="w-100 orange-btn">
              Sign Up
            </button>

            {message && (
              <div className="alert alert-info mt-3 text-center">
                {message}
              </div>
            )}

            <div className="text-center my-3">or</div>

            <p className="text-center mt-3">
              Already Have An Account?{" "}
              <Link className="signup-link" to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
