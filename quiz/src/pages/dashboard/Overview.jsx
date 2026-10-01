import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { useNavigate } from 'react-router-dom';
import {
  FaTrophy, FaChartBar, FaCheckCircle, FaTimesCircle,
  FaBolt, FaPlayCircle, FaExclamationTriangle, FaInbox,
  FaChartLine, FaBook, FaMedal, FaHandPeace,
} from 'react-icons/fa';
import { MdOutlineScatterPlot, MdPieChart } from 'react-icons/md';
import API_BASE from '../../api';
import './Overview.css';

// ── Stat Card ────────────────────────────────────────────────
function StatCard({ icon, label, value, sub, accent, delay }) {
  return (
    <motion.div
      className="stat-card"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay || 0 }}
    >
      <div className="stat-icon" style={{ background: accent || '#F5F5F5' }}>
        {icon}
      </div>
      <div className="stat-body">
        <p className="stat-label">{label}</p>
        <h3 className="stat-value">{value}</h3>
        {sub && <p className="stat-sub">{sub}</p>}
      </div>
    </motion.div>
  );
}

// ── Tooltip ───────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="chart-tooltip">
      <p className="tt-label">{payload[0]?.payload?.date || label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: '#fff', margin: '2px 0' }}>
          {p.name}: <strong>
            {p.value}
            {['score', 'avgPct', 'best'].includes(p.name) ? '%' : ''}
          </strong>
        </p>
      ))}
      {payload[0]?.payload?.topic && (
        <p className="tt-topic"><FaBook size={10} style={{ marginRight: 4 }} />{payload[0].payload.topic}</p>
      )}
    </div>
  );
};

// ── Empty Chart Placeholder ───────────────────────────────────
function EmptyChart({ message }) {
  return (
    <div className="empty-chart">
      <FaInbox size={28} color="#D1D5DB" />
      <p>{message || 'No data yet'}</p>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────
export default function Overview() {
  const [stats, setStats] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId');
  const token  = localStorage.getItem('token');

  useEffect(() => {
    if (!userId) {
      setError('You are not logged in.');
      setLoading(false);
      return;
    }

    const fetchAll = async () => {
      try {
        // Fetch both in parallel
        const [statsRes, profileRes] = await Promise.all([
          fetch(`${API_BASE}/api/result/dashboard-stats/${userId}`),
          fetch(`${API_BASE}/api/auth/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        // Parse stats — allow 404 to show empty state gracefully
        let statsData = {
          totalQuizzes: 0, avgScore: 0, bestScore: 0,
          totalCorrect: 0, totalWrong: 0, bestTopic: null,
          topicStats: [], recentTrend: [], scoreDistribution: [],
        };

        if (statsRes.ok) {
          const ct = statsRes.headers.get('content-type') || '';
          if (ct.includes('application/json')) {
            statsData = await statsRes.json();
          }
        } else {
          console.warn(`Stats API returned ${statsRes.status} — showing empty state`);
        }

        // Parse profile
        let profileData = null;
        if (profileRes.ok) {
          const ct = profileRes.headers.get('content-type') || '';
          if (ct.includes('application/json')) {
            profileData = await profileRes.json();
          }
        }

        setStats(statsData);
        setProfile(profileData);
      } catch (err) {
        console.error('Dashboard fetch error:', err);
        setError('Cannot reach the server. Make sure it is running on port 5000.');
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [userId, token]);

  // ── Loading ──────────────────────────────────────────────
  if (loading) {
    return (
      <div className="overview-center-state">
        <div className="spinner-border" style={{ color: '#101010', width: 36, height: 36 }} role="status" />
        <p>Loading your dashboard…</p>
      </div>
    );
  }

  // ── Server unreachable ───────────────────────────────────
  if (error) {
    return (
      <div className="overview-center-state">
        <div className="ov-error-card">
          <FaExclamationTriangle size={36} color="#f59e0b" />
          <h4>Could not load dashboard</h4>
          <p>{error}</p>
          <button className="btn-start-quiz" onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  const hasData    = stats && stats.totalQuizzes > 0;
  const hasTrend   = hasData && stats.recentTrend?.length > 0;
  const hasTopics  = hasData && stats.topicStats?.length > 0;
  const hasRadar   = hasData && stats.topicStats?.length >= 3;

  const pieData = hasData ? [
    { name: 'Correct', value: stats.totalCorrect },
    { name: 'Wrong',   value: stats.totalWrong   },
  ] : [];

  const radarData = (stats?.topicStats || []).slice(0, 6).map(t => ({
    subject: t.topic.length > 12 ? t.topic.slice(0, 11) + '…' : t.topic,
    score: t.avgPct,
    best:  t.best,
  }));

  return (
    <div className="overview-container">

      {/* ── Welcome header ────────────────────────────────── */}
      <motion.div
        className="overview-header"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div>
          <h2 className="overview-greeting">
            Welcome back, <span>{profile?.name?.split(' ')[0] || 'Learner'}</span> <FaHandPeace style={{ fontSize: 22, verticalAlign: 'middle', color: '#5F5F60' }} />
          </h2>
          <p className="overview-subtitle">
            {hasData
              ? `${stats.totalQuizzes} quiz${stats.totalQuizzes !== 1 ? 'zes' : ''} completed · avg ${stats.avgScore}% · best ${stats.bestScore}%`
              : 'No quizzes yet — start one to unlock your stats!'}
          </p>
        </div>
        <button className="btn-start-quiz" onClick={() => navigate('/dashboard/search-topic')}>
          <FaPlayCircle /> Start a Quiz
        </button>
      </motion.div>

      {/* ── Stat cards ────────────────────────────────────── */}
      <div className="stat-cards-grid">
        <StatCard delay={0.05} icon={<FaChartBar size={20} />}       label="Total Quizzes"  value={stats?.totalQuizzes ?? 0}    sub="all time"                                              accent="#F5F5F5" />
        <StatCard delay={0.10} icon={<FaTrophy size={20} />}         label="Avg Score"      value={`${stats?.avgScore ?? 0}%`}  sub={hasData ? `best: ${stats.bestScore}%` : '—'}           accent="#F5F5F5" />
        <StatCard delay={0.15} icon={<FaCheckCircle size={20} />}    label="Correct"        value={stats?.totalCorrect ?? 0}    sub="total correct answers"                                 accent="#F5F5F5" />
        <StatCard delay={0.20} icon={<FaTimesCircle size={20} />}    label="Wrong"          value={stats?.totalWrong ?? 0}      sub="keep practising"                                       accent="#F5F5F5" />
        <StatCard delay={0.25} icon={<FaBolt size={20} />}           label="Best Topic"     value={stats?.bestTopic ?? '—'}     sub={stats?.bestTopic ? 'highest avg score' : 'take more quizzes'} accent="#F5F5F5" />
      </div>

      {/* ── No-data empty state ───────────────────────────── */}
      {!hasData && (
        <motion.div
          className="no-data-banner"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <FaTrophy size={44} color="#D1D5DB" />
          <h4>Your stats will appear here</h4>
          <p>Complete your first quiz to unlock score charts, topic breakdowns, and performance trends.</p>
          <button className="btn-start-quiz" onClick={() => navigate('/dashboard/search-topic')}>
            Take your first quiz
          </button>
        </motion.div>
      )}

      {/* ── Charts (only when data exists) ───────────────── */}
      {hasData && (
        <>
          {/* Row 1 — trend + distribution */}
          <div className="charts-row two-col">
            {/* Score Trend */}
            <motion.div className="chart-card span-wide"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <h5 className="chart-title"><FaChartLine size={14} /> Score Trend (Last 10 Quizzes)</h5>
              {hasTrend ? (
                <ResponsiveContainer width="100%" height={240}>
                  <LineChart data={stats.recentTrend} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#EBEBEB" />
                    <XAxis dataKey="quiz" tick={{ fontSize: 12, fill: '#5F5F60' }} label={{ value: 'Quiz #', position: 'insideBottomRight', offset: -4, fontSize: 11, fill: '#9CA3AF' }} />
                    <YAxis domain={[0, 100]} tickFormatter={v => `${v}%`} tick={{ fontSize: 12, fill: '#5F5F60' }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="score" stroke="#101010" strokeWidth={2.5}
                      dot={{ r: 5, fill: '#101010', strokeWidth: 0 }} activeDot={{ r: 7 }} name="score" />
                    <Line type="monotone" dataKey={() => 50} stroke="#D0D0D0"
                      strokeDasharray="6 4" strokeWidth={1.5} dot={false} name="50% pass" legendType="none" />
                  </LineChart>
                </ResponsiveContainer>
              ) : <EmptyChart message="Not enough quiz data for trend" />}
            </motion.div>

            {/* Score Distribution */}
            <motion.div className="chart-card"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <h5 className="chart-title"><FaChartBar size={14} /> Score Distribution</h5>
              {stats.scoreDistribution?.some(b => b.count > 0) ? (
                <>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={stats.scoreDistribution} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#EBEBEB" />
                      <XAxis dataKey="range" tick={{ fontSize: 11, fill: '#5F5F60' }} />
                      <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: '#5F5F60' }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="count" name="Quizzes" radius={[6, 6, 0, 0]}>
                        {stats.scoreDistribution.map((_, i) => (
                          <Cell key={i} fill={i >= 3 ? '#101010' : '#C8C8C8'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                  <p className="chart-note">Dark = 61%+ score &nbsp;·&nbsp; Light = below 61%</p>
                </>
              ) : <EmptyChart message="No distribution data yet" />}
            </motion.div>
          </div>

          {/* Row 2 — pie + topic bars */}
          <div className="charts-row two-col">
            {/* Correct vs Wrong Donut */}
            <motion.div className="chart-card"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <h5 className="chart-title"><MdPieChart size={15} /> Correct vs Wrong</h5>
              {pieData[0]?.value > 0 || pieData[1]?.value > 0 ? (
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%"
                      innerRadius={58} outerRadius={92} paddingAngle={4} dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}>
                      <Cell fill="#101010" />
                      <Cell fill="#D4D4D4" />
                    </Pie>
                    <Tooltip formatter={(v, n) => [`${v} answers`, n]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : <EmptyChart message="No answer data yet" />}
            </motion.div>

            {/* Topic Performance */}
            <motion.div className="chart-card span-wide"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              <h5 className="chart-title"><FaBook size={14} /> Topic Performance</h5>
              {hasTopics ? (
                <>
                  <ResponsiveContainer width="100%" height={240}>
                    <BarChart data={stats.topicStats.slice(0, 8)} layout="vertical"
                      margin={{ top: 5, right: 24, left: 8, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#EBEBEB" horizontal={false} />
                      <XAxis type="number" domain={[0, 100]} tickFormatter={v => `${v}%`} tick={{ fontSize: 11, fill: '#5F5F60' }} />
                      <YAxis type="category" dataKey="topic" width={100} tick={{ fontSize: 11, fill: '#5F5F60' }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar dataKey="avgPct" name="Avg %" fill="#9CA3AF" radius={[0, 6, 6, 0]} />
                      <Bar dataKey="best"   name="Best %" fill="#101010" radius={[0, 6, 6, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                  <p className="chart-note">Gray = avg accuracy &nbsp;·&nbsp; Black = best score per topic</p>
                </>
              ) : <EmptyChart message="No topic data yet" />}
            </motion.div>
          </div>

          {/* Row 3 — radar + leaderboard (only if 3+ topics) */}
          {hasRadar && (
            <div className="charts-row two-col">
              <motion.div className="chart-card"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <h5 className="chart-title"><MdOutlineScatterPlot size={15} /> Topic Mastery Radar</h5>
                <ResponsiveContainer width="100%" height={280}>
                  <RadarChart data={radarData} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
                    <PolarGrid stroke="#E5E5E5" />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: '#5F5F60' }} />
                    <Radar name="Avg %" dataKey="score" stroke="#9CA3AF" fill="#9CA3AF" fillOpacity={0.3} />
                    <Radar name="Best %" dataKey="best"  stroke="#101010" fill="#101010" fillOpacity={0.15} />
                    <Legend />
                    <Tooltip formatter={v => [`${v}%`]} />
                  </RadarChart>
                </ResponsiveContainer>
              </motion.div>

              <motion.div className="chart-card span-wide"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
                <h5 className="chart-title"><FaMedal size={14} /> Topic Leaderboard</h5>
                <div className="topic-leaderboard">
                  {stats.topicStats.slice(0, 8).map((t, i) => (
                    <div key={i} className="lb-row">
                      <span className="lb-rank">{i + 1}</span>
                      <span className="lb-topic">{t.topic}</span>
                      <span className="lb-quizzes">{t.quizzes}×</span>
                      <div className="lb-bar-wrap">
                        <div className="lb-bar" style={{
                          width: `${t.avgPct}%`,
                          background: t.avgPct >= 70 ? '#101010' : t.avgPct >= 40 ? '#6B7280' : '#D1D5DB',
                        }} />
                      </div>
                      <span className="lb-pct">{t.avgPct}%</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}

          {/* Leaderboard only (when < 3 topics — no radar) */}
          {!hasRadar && hasTopics && (
            <motion.div className="chart-card full-width"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <h5 className="chart-title"><FaMedal size={14} /> Topic Leaderboard</h5>
              <div className="topic-leaderboard">
                {stats.topicStats.map((t, i) => (
                  <div key={i} className="lb-row">
                    <span className="lb-rank">{i + 1}</span>
                    <span className="lb-topic">{t.topic}</span>
                    <span className="lb-quizzes">{t.quizzes} quiz{t.quizzes !== 1 ? 'zes' : ''}</span>
                    <div className="lb-bar-wrap">
                      <div className="lb-bar" style={{
                        width: `${t.avgPct}%`,
                        background: t.avgPct >= 70 ? '#101010' : t.avgPct >= 40 ? '#6B7280' : '#D1D5DB',
                      }} />
                    </div>
                    <span className="lb-pct">{t.avgPct}%</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}
