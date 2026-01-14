import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function TopicPercentage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      setError("User not logged in");
      setLoading(false);
      return;
    }

    async function fetchResults() {
      try {
        const res = await axios.get(`http://localhost:5000/api/result/results/${userId}`);
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

  const getPercentage = (score, totalQuestions) => {
    if (!totalQuestions || totalQuestions === 0) return 0;
    return ((score / totalQuestions) * 100).toFixed(2);
  };

  if (loading) return <div className="text-center py-5 text-muted">Analyzing stats...</div>;
  if (error) return <div className="alert alert-danger py-3 mx-4">{error}</div>;
  if (results.length === 0) return <div className="text-center py-5 text-muted">No statistics available yet.</div>;

  return (
    <div className="container py-2">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="mb-4 fw-bold text-white fs-2">Topic-wise <span className="text-primary">Analytics</span></h3>

        <div className="results-table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Accuracy</th>
                <th>Progress</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {results.map((res, idx) => {
                const percentage = getPercentage(res.score, res.totalQuestions);
                const isPass = percentage >= 50;
                return (
                  <motion.tr
                    key={res._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <td className="fw-bold text-white">{res.topic}</td>
                    <td><span className="score-badge">{percentage}%</span></td>
                    <td>
                      <div className="progress bg-dark" style={{ height: '8px', width: '150px', borderRadius: '4px' }}>
                        <div
                          className={`progress-bar ${isPass ? 'bg-primary' : 'bg-danger'}`}
                          style={{ width: `${percentage}%`, borderRadius: '4px' }}
                        ></div>
                      </div>
                    </td>
                    <td className={isPass ? "text-success" : "text-danger"}>
                      {isPass ? "Excellent" : "Needs Review"}
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
