import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import "./Timeline.css";
import { firestore } from "../firebase";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import ReviewModal from "./ReviewModal"; // Import Review Modal component

function Timeline() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); // For opening modal with the selected order

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

  // Open modal to submit review for selected order
  const openReviewModal = (order) => {
    setSelectedOrder(order);
  };

  // Handle review submission from modal
  const handleReviewSubmit = async (review) => {
    if (selectedOrder) {
      try {
        const orderDoc = doc(firestore, "messages", selectedOrder.id);
        await updateDoc(orderDoc, { review });
        //alert("Review submitted!");
        setSelectedOrder(null); // Close modal after submission
      } catch (error) {
        console.error("Error submitting review: ", error);
      }
    }
  };

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
              {order.trackingNumber && (
                <p><strong>Tracking Number:</strong> {order.trackingNumber}</p>
              )}
              {order.quote > 0 && (
                <p className="quote">Quote: R {order.quote}</p>
              )}
              <img
                src={order.imageUrl}
                alt={order.device}
                className="timeline-image"
              />

              {/* Review Section */}
              {order.status === "Ready for Collection" && (
                <div className="review-section">
                  <button onClick={() => openReviewModal(order)}>
                    Submit Review
                  </button>
                  {/* Display the stars based on the stored review */}
                  {order.review && (
                    <div className="stars">
                      {"★".repeat(order.review)}
                      {"☆".repeat(5 - order.review)}
                    </div>
                  )}
                </div>
              )}
              <span className="circle" />
            </div>
          </div>
        ))}
      </div>

      {/* Review Modal */}
      {selectedOrder && (
        <ReviewModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onSubmit={handleReviewSubmit}
        />
      )}
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