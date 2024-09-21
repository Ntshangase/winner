import React, { useState } from 'react';
import './RepairNavbar.css';
import { Link } from 'react-router-dom';

export default function RepairNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Track My Repair</Link>
      </div>
      <div className="navbar-toggle" onClick={toggleMenu}>
        <span className="hamburger"></span>
        <span className="hamburger"></span>
        <span className="hamburger"></span>
      </div>
      <ul className={`navbar-nav ${isOpen ? 'open' : ''}`}>
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