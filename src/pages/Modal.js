import React from 'react';
import './Modal.css'; // Import the CSS for modal styling

function Modal({ isOpen, onClose, order }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Order Details</h2>
        <h3>Device: {order.device}</h3>
        <p>Status: {order.stage}</p>
        <p>Description: {order.description}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Modal;