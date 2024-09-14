import React, { useState, useEffect } from 'react';
import './Modal.css'; // Import the CSS for modal styling

function Modal({ isOpen, onClose, order, onSave }) {
  const [name, setName] = useState(order.name || '');
  const [description, setDescription] = useState(order.description || '');
  const [status, setStatus] = useState(order.status || '');
  const [quote, setQuote] = useState(order.quote || '');

  useEffect(() => {
    setName(order.name || '');
    setDescription(order.description || '');
    setStatus(order.status || '');
    setQuote(order.quote || '');
  }, [order]);

  const handleSave = () => {
    onSave(order.id, { name, description, status, quote: Number(quote) });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Order Details</h2>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="modal-input"
          />
        </label>
        <label>
          Status:
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="modal-input"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Ready for Collection">Ready for Collection</option>
          </select>
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="modal-textarea"
          />
        </label>
        <label>
          Quote:
          <input
            type="number"
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            placeholder="Enter quote"
            className="modal-input"
          />
        </label>
        <div className="modal-buttons">
          <button onClick={handleSave} className="modal-button save-button">Save</button>
          <button onClick={onClose} className="modal-button close-button">Close</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;