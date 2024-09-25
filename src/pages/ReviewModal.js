import React, { useState } from "react";
import "./ReviewModal.css"; // Ensure modal styling is in place

function ReviewModal({ order, onClose, onSubmit }) {
  const [review, setReview] = useState(0); // Default review value is 0 stars

  // Handle star rating selection
  const handleStarClick = (value) => {
    setReview(value);
  };

  // Handle form submission
  const handleSubmit = () => {
    onSubmit(review); // Pass review value back to Timeline component
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>Leave a Review for {order.device}</h3>
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={star <= review ? "filled-star" : "empty-star"}
              onClick={() => handleStarClick(star)}
            >
              ★
            </span>
          ))}
        </div>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default ReviewModal;