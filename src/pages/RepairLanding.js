import React from "react";
import RepairNavbar from "../Components/RepairNavbar";

function RepairLanding() {
	return (
		<div>
			<RepairNavbar />
			<div style={{ padding: "20px" }}>
				<h2>Admin Dashboard</h2>
				<h3>Repair Requests</h3>
				<table style={{ width: "100%", borderCollapse: "collapse" }}>
					<thead>
						<tr>
							<th style={{ border: "1px solid #ccc", padding: "10px" }}>
								User
							</th>
							<th style={{ border: "1px solid #ccc", padding: "10px" }}>
								Device
							</th>
							<th style={{ border: "1px solid #ccc", padding: "10px" }}>
								Status
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td style={{ border: "1px solid #ccc", padding: "10px" }}>
								John Doe
							</td>
							<td style={{ border: "1px solid #ccc", padding: "10px" }}>
								Laptop
							</td>
							<td style={{ border: "1px solid #ccc", padding: "10px" }}>
								In Progress
							</td>
						</tr>
						<tr>
							<td style={{ border: "1px solid #ccc", padding: "10px" }}>
								Jane Smith
							</td>
							<td style={{ border: "1px solid #ccc", padding: "10px" }}>
								Phone
							</td>
							<td style={{ border: "1px solid #ccc", padding: "10px" }}>
								Completed
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default RepairLanding;
