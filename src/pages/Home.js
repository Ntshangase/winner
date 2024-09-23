import React from "react";
import { Link } from "react-router-dom";
import './Home.css'; // Import the CSS file for styling

function Home() {
  return (
    <div className="home-container">
      <header className="hero-section">
        <h1 className="hero-title">Welcome to Track My Repair</h1>
        <p className="hero-description">Submit your repair requests easily and track their status in real-time.</p>
        <div className="hero-buttons">
          <Link to="/CustomerLanding" className="hero-button primary-button">Customer Landing</Link>
          <Link to="/Login" className="hero-button secondary-button">Repair Landing</Link>
        </div>
      </header>

      <section className="features-section">
        <h2 className="features-title">Why Choose Us?</h2>
        <div className="features-container">
          <div className="feature-item">
            <h3>Quick and Easy</h3>
            <p>Submit your repair requests in just a few clicks.</p>
          </div>
          <div className="feature-item">
            <h3>Real-Time Tracking</h3>
            <p>Track the status of your repairs in real-time.</p>
          </div>
          <div className="feature-item">
            <h3>Expert Technicians</h3>
            <p>Our technicians are highly skilled and experienced.</p>
          </div>
        </div>
      </section>

      <footer className="home-footer">
        <p>&copy; 2024 Track My Repair. All rights reserved.</p>
        <p>Mzansi Developers</p>
      </footer>
    </div>
  );
}

export default Home;