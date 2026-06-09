import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import SignupPage from "./components/login/signup";
import LoginPage from "./components/login/login";
import Quiz from "./pages/quiz-page/quiz";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ShowQuestion from "./pages/question/ShowQuestion";
import Result from "./pages/result/Result";
import UserDashBoard from "./pages/dashboard/UserDashBoard";
import Navbar from "./components/navbar/Navbar";
import HomeMain from "./pages/home/HomeMain";
import Footer from "./components/footer/footer";

// Wrapper to use useLocation in the outer App
function AppWrapper() {
  const location = useLocation();

  // Hide header and footer on app-focused/auth pages.
  const hideHeaderFooter =
    location.pathname.startsWith("/dashboard") ||
    location.pathname === "/show-question" ||
    location.pathname === "/result" ||
    location.pathname === "/login" ||
    location.pathname === "/signup";

  return (
    <>
      {!hideHeaderFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<HomeMain />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/show-question" element={<ShowQuestion />} />
        <Route path="/result" element={<Result />} />
        <Route path="/dashboard/*" element={<UserDashBoard />} />
      </Routes>
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
