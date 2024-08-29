import React from "react";
import { Link } from "react-router-dom";
import './Home.css'; // Import the CSS file for styling

function Home() {
	return (
		<div className="home-container">
			<h1 className="home-title">Welcome to Track My Repair</h1>
			<p className="home-description">Submit your repair requests easily and track their status.</p>
			<div className="button-container">
				<Link to="/CustomerLanding">
					<button className="home-button">Customer Landing</button>
				</Link>
				<Link to="/Login">
					<button className="home-button">Repair Landing</button>
				</Link>
			</div>
			<footer className="home-footer">
				<p>&copy; 2024 Track My Repair</p>
			</footer>
		</div>
	);
}

export default Home;