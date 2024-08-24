import React from 'react';
import './RepairNavbar.css';
import { Link } from 'react-router-dom';

export default function RepairNavbar() {
  return (
    <nav className="navbar">
    <div className="navbar-brand">
      <Link to="/">Track My Repair</Link>
    </div>
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link to="/RepairLanding">Landing Page</Link>
      </li>
      <li className="nav-item">
        <Link to="/UpdateQuote">Timeline</Link>
      </li>
    </ul>
  </nav>
  );
}