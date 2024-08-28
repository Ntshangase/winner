import React from "react";
import { Link } from "react-router-dom";

function Home() {
	return (
		<div>
			<div style={{ textAlign: "center", padding: "20px" }}>
				<h1>Welcome to Track My Repair</h1>
				<p>Submit your repair requests easily and track their status.</p>
				<Link to="/CustomerLanding">
					<button
						style={{
							padding: "10px 20px",
							fontSize: "16px",
							marginRight: "5px",
						}}
					>
						Customer Landing
					</button>
				</Link>
				<Link to="/Login">
					<button style={{ padding: "10px 20px", fontSize: "16px" }}>
						RepairLanding
					</button>
				</Link>
				<footer style={{ marginTop: "20px" }}>
					<p>&copy; 2024 Track My Repair</p>
				</footer>
			</div>
		</div>
	);
}

export default Home;
