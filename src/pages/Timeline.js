import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import "./Timeline.css"; // Import the CSS file for styling
//import Modal from './Modal'; // Import the Modal component
import { firestore } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore"; // Import Firestore functions

function Timeline() {
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		const ordersCollection = collection(firestore, "messages");

		// Set up real-time listener
		const unsubscribe = onSnapshot(ordersCollection, (snapshot) => {
			const ordersList = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setOrders(ordersList);
		});

		// Clean up the listener on unmount
		return () => unsubscribe();
	}, []);

	return (
		<div className="timeline-container">
			<Navbar />
			<h2 className="timeline-title">Customer Orders Timeline</h2>
			<div className="timeline">
				{orders.map((order) => (
					<div key={order.id} className="timeline-item">
						<div className="timeline-item-content">
							<span
								className="tag"
								style={{ background: getStatusColor(order.status) }}
							>
								{order.status}
							</span>
							<h3>{order.name}</h3>
							<p>{order.description}</p>
							{order.quote > 0 && (
								<p className="quote">Quote: R {order.quote}</p>
							)}
							<img
								src={order.imageUrl}
								alt={order.device}
								className="timeline-image"
							/>
							<span className="circle" />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

// Helper function to get color based on status
const getStatusColor = (status) => {
	switch (status) {
		case "Pending":
			return "#ff9800";
		case "In Progress":
			return "#2196f3";
		case "Ready for Collection":
			return "#4caf50";
		default:
			return "#9e9e9e";
	}
};

export default Timeline;
