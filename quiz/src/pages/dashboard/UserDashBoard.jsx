import React from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import SideBar from './SideBar';
import Profile from './Profile';
import History from './History';
import PreviousResult from './PreviousResult';
import TopicPercentage from './TopicPercentage';
import TopicSearch from './TopicSearch';

export default function UserDashBoard() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F5F5F5' }}>
      <SideBar />
      <div style={{
        flexGrow: 1,
        padding: '40px 48px',
        overflowY: 'auto',
        background: '#F5F5F5',
        width: '100%',
      }}>
        <Routes>
          <Route index element={<Navigate to="profile" replace />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/history" element={<History />} />
          <Route path="/previous-result" element={<PreviousResult />} />
          <Route path="/topic-percentage" element={<TopicPercentage />} />
          <Route path="/search-topic" element={<TopicSearch />} />
        </Routes>
        <Outlet />
      </div>
    </div>
  );
}
