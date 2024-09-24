import React, { useState, useEffect } from 'react';
import './RepairNavbar.css';
import './global.css'; // Import the global CSS file
import { Link } from 'react-router-dom';

export default function RepairNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

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
          <Link to="/SearchQuote">Search Order</Link>
        </li>
      </ul>
      {/* Theme Toggle Button */}
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === 'light' ? (
          <i className="fas fa-moon"></i>
        ) : (
          <i className="fas fa-sun"></i>
        )}
      </button>
    </nav>
  );
}