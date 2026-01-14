import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FaUserCircle,
  FaHistory,
  FaChartLine,
  FaPercentage,
  FaSearch,
  FaSignOutAlt
} from 'react-icons/fa';

import './sidebar.css';

export default function SideBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/login');
  };

  const linkClass = ({ isActive }) =>
    `nav-item-link ${isActive ? 'active' : ''}`;

  return (
    <div className="sidebar-container">
      <h2 className="sidebar-title">Quiz<span>App</span></h2>
      <nav className="nav flex-column">
        <NavLink to="/dashboard/" className={linkClass}>
          <FaUserCircle className="nav-icon" />
          <span>My Profile</span>
        </NavLink>

        <NavLink to="/dashboard/previous-result" className={linkClass}>
          <FaChartLine className="nav-icon" />
          <span>Performances</span>
        </NavLink>

        <NavLink to="/dashboard/topic-percentage" className={linkClass}>
          <FaPercentage className="nav-icon" />
          <span>Stats View</span>
        </NavLink>

        <NavLink to="/dashboard/history" className={linkClass}>
          <FaHistory className="nav-icon" />
          <span>Trending</span>
        </NavLink>

        <NavLink to="/dashboard/search-topic" className={linkClass}>
          <FaSearch className="nav-icon" />
          <span>Explore</span>
        </NavLink>

        <button className="nav-item-link logout-btn" onClick={handleLogout}>
          <FaSignOutAlt className="nav-icon" />
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
}
