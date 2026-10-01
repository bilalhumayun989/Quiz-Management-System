import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "./PreviousResult.css";
import API_BASE from '../../api';

export default function PreviousResult() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedResult, setSelectedResult] = useState(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      setError("User not logged in");
      setLoading(false);
      return;
    }

    async function fetchResults() {
      try {
        const res = await axios.get(`${API_BASE}/api/result/results/${userId}`);
        setResults(res.data);
      } catch (err) {
        console.error("Error fetching results:", err);
        setError("Failed to load results");
      } finally {
        setLoading(false);
      }
    }

    fetchResults();
  }, [userId]);

  const openModal = (result) => {
    setSelectedResult(result);
    const modal = new window.bootstrap.Modal(document.getElementById("resultModal"));
    modal.show();
  };

  if (loading) return <div className="text-center py-5 text-muted">Loading your progress...</div>;
  if (error) return <div className="alert alert-danger py-3 mx-4">{error}</div>;
  if (results.length === 0) return (
    <div className="text-center py-5">
      <h4 className="text-muted">No results found yet.</h4>
      <p className="text-muted">Take your first quiz to see your progress here!</p>
    </div>
  );

  return (
    <div className="container py-2">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="mb-4 fw-bold fs-2">Quiz <span>Journal</span></h3>

        <div className="results-table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Topic</th>
                <th>Score</th>
                <th>Correct</th>
                <th>Wrong</th>
                <th>Date</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {results.map((res, idx) => (
                <motion.tr
                  key={res._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <td className="topic-cell fw-bold">{res.topic}</td>
                  <td><span className="score-badge">{res.score}/{res.totalQuestions}</span></td>
                  <td className="text-success">{Array.isArray(res.correctAnswers) ? res.correctAnswers.length : res.correctAnswers}</td>
                  <td className="text-danger">{Array.isArray(res.wrongAnswers) ? res.wrongAnswers.length : res.wrongAnswers}</td>
                  <td className="date-text">{new Date(res.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button className="btn btn-primary-custom btn-sm py-1 px-3" onClick={() => openModal(res)}>
                      View
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Modal */}
      <div className="modal fade" id="resultModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Performance Analysis</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body row">
              <div className="col-md-6 border-end border-secondary">
                <h6 className="text-danger mb-4 fw-bold">Incorrect Answers</h6>
                <div className="pe-3">
                  {selectedResult?.wrongAnswers?.length > 0 ? (
                    selectedResult.wrongAnswers.map((item, i) => (
                      <div key={i} className="q-box">
                        <p className="mb-2 text-white"><strong>Q:</strong> {item.question}</p>
                        <p className="mb-1 text-danger small"><strong>Your Answer:</strong> {item.userAnswer}</p>
                        <p className="mb-0 text-success small"><strong>Correct:</strong> {item.correctAnswer}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted italic">Perfect score! No mistakes.</p>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <h6 className="text-success mb-4 fw-bold">Correct Answers</h6>
                <div className="ps-3">
                  {selectedResult?.correctAnswers?.length > 0 ? (
                    selectedResult.correctAnswers.map((item, i) => (
                      <div key={i} className="q-box border-success">
                        <p className="mb-2 text-white"><strong>Q:</strong> {item.question}</p>
                        <p className="mb-0 text-success small"><strong>Your Answer:</strong> {item.userAnswer}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted italic">Zero correct items.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
