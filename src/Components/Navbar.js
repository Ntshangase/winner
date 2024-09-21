import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Track My Repair</Link>
      </div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/CustomerLanding">Landing Page</Link>
        </li>
        <li className="nav-item">
          <Link to="/Timeline">Timeline</Link>
        </li>
      </ul>
    </nav>
  );
}

// test