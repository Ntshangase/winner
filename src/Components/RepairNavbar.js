import React, { useState } from 'react';
import './RepairNavbar.css';
import { Link } from 'react-router-dom';

export default function RepairNavbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Track My Repair</Link>
        <button className="navbar-toggle" onClick={toggleNav}>
        ☰
      </button>
      </div>
      <ul className={`navbar-nav ${isNavOpen ? 'open' : ''}`}>
        <li className="nav-item">
          <Link to="/RepairLanding">Landing Page</Link>
        </li>
        <li className="nav-item">
          <Link to="/UpdateQuote">Update Order</Link>
        </li>
      </ul>
    </nav>
  );
}