import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import SideBar from './SideBar';
import Profile from './Profile';
import History from './History';
import PreviousResult from './PreviousResult';
import TopicPercentage from './TopicPercentage';
import TopicSearch from './TopicSearch';

export default function UserDashBoard() {
  return (
    <div className="d-flex bg-dark" style={{ minHeight: '100vh' }}>
      <SideBar />
      <div className="flex-grow-1 p-4 p-md-5 overflow-auto w-100" style={{ background: 'var(--bg-dark)' }}>
        <div className="container-fluid p-0">
          <Routes>
            <Route path="/" element={<Profile />} />
            <Route path="/history" element={<History />} />
            <Route path='/previous-result' element={<PreviousResult />}></Route>
            <Route path='/topic-percentage' element={<TopicPercentage />}></Route>
            <Route path='/search-topic' element={<TopicSearch />}></Route>
          </Routes>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
