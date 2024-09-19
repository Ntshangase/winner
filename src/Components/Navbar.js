import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

export default function Navbar() {
  const [isNavActive, setIsNavActive] = useState(false);

  const handleToggle = () => {
    setIsNavActive(!isNavActive);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Track My Repair</Link>
        <span className="navbar-toggle" onClick={handleToggle}>
          &#9776;
        </span>
      </div>
      <ul className={`navbar-nav ${isNavActive ? 'active' : ''}`}>
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