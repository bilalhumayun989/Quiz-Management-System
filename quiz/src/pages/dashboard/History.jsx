import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './TrendingTopics.css';
import API_BASE from '../../api';

export default function TrendingTopics() {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/result/all-results`);
        const data = await res.json();

        const topicCount = {};
        data.forEach(item => {
          const topic = item.topic.toLowerCase();
          topicCount[topic] = (topicCount[topic] || 0) + 1;
        });

        const sortedTopics = Object.entries(topicCount)
          .sort((a, b) => b[1] - a[1])
          .map(([topic, count]) => ({ topic, count }));

        setTrending(sortedTopics);
      } catch (err) {
        console.error('Error fetching trending topics:', err);
      }
    };

    fetchResults();
  }, []);

  return (
    <div className="trending-container">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="mb-5 fw-bold text-white fs-2">Trending <span className="text-primary">Topics</span></h2>

        <div className="trending-list">
          {trending.map((item, idx) => (
            <motion.div
              key={idx}
              className="trending-item"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <span className="topic-tag">{item.topic}</span>
              <span className="search-count">
                {item.count} {item.count === 1 ? 'Search' : 'Searches'}
              </span>
            </motion.div>
          ))}
          {trending.length === 0 && <p className="text-muted">No trending topics found yet.</p>}
        </div>
      </motion.div>
    </div>
  );
}
