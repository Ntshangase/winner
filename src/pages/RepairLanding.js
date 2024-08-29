import React, { useState } from "react";
import RepairNavbar from "../Components/RepairNavbar";
import './RepairLanding.css'; 

function RepairLanding() {
  const [repairRequests, setRepairRequests] = useState([
    { id: 1, user: "John Doe", email: "john@example.com", category: "Laptop", status: "In Progress", description: "Screen replacement", quote: "150.00" },
    { id: 2, user: "Jane Smith", email: "jane@example.com", category: "Phone", status: "Completed", description: "Battery replacement", quote: "75.00" },
    { id: 3, user: "Alice Johnson", email: "alice@example.com", category: "Car Maintenance", status: "In Progress", description: "Oil change", quote: "50.00" },
    { id: 4, user: "Bob Brown", email: "bob@example.com", category: "Clothing Revamp", status: "Ready for Collection", description: "Hem pants", quote: "25.00" },
    { id: 5, user: "Charlie Davis", email: "charlie@example.com", category: "Laptop", status: "In Progress", description: "Keyboard replacement", quote: "120.00" },
    { id: 6, user: "Diana Evans", email: "diana@example.com", category: "Phone", status: "Completed", description: "Screen repair", quote: "80.00" },
    { id: 7, user: "Ethan Foster", email: "ethan@example.com", category: "Car Maintenance", status: "In Progress", description: "Tire rotation", quote: "30.00" },
    { id: 8, user: "Fiona Green", email: "fiona@example.com", category: "Clothing Revamp", status: "Ready for Collection", description: "Patch jeans", quote: "15.00" },
  ]);

  const [quoteData, setQuoteData] = useState({
    requestId: "",
    quote: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  const handleQuoteChange = (e) => {
    setQuoteData({ ...quoteData, [e.target.name]: e.target.value });
  };

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    setRepairRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === parseInt(quoteData.requestId)
          ? { ...request, quote: quoteData.quote }
          : request
      )
    );
    setQuoteData({ requestId: "", quote: "" });
    setIsModalOpen(false); // Close the modal after submitting the quote
  };

  const handleEditClick = (request) => {
    setSelectedRequest(request);
    setNewStatus(request.status); // Initialize newStatus with the current status
    setQuoteData({ requestId: request.id, quote: request.quote });
    setIsModalOpen(true);
  };

  const handleStatusChange = (requestId, newStatus) => {
    setRepairRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === requestId ? { ...request, status: newStatus } : request
      )
    );
  };

  const handleSave = () => {
    handleStatusChange(selectedRequest.id, newStatus);
    setRepairRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === selectedRequest.id
          ? { ...request, quote: quoteData.quote }
          : request
      )
    );
    setIsModalOpen(false); // Close the modal after saving
  };

  const EditStatusModal = () => {
    if (!isModalOpen) return null;

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Edit Repair Status</h2>
          <label htmlFor="status">Select Status:</label>
          <select
            id="status"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          >
            <option value="Order Received">Order Received</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Ready for Collection">Ready for Collection</option>
          </select>

          <h3>Send Repair Quote</h3>
          <form className="send-quote-form" onSubmit={handleQuoteSubmit}>
            <label htmlFor="quote">Enter Quote:</label>
            <input
              type="number"
              name="quote"
              value={quoteData.quote}
              onChange={handleQuoteChange}
              placeholder="Enter repair cost"
              required
              min="0"
              step="0.01"
            />

            <div className="modal-buttons">
              <button
                type="button"
                className="save-button"
                onClick={handleSave}
              >
                Save
              </button>
              <button type="button" className="cancel-button" onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="repair-landing-container">
      <RepairNavbar />
      <h2 className="repair-landing-title">Repair Shop Dashboard</h2>
      <h3>Active Repairs</h3>
      <ul className="repair-requests-list">
        {repairRequests.map((request) => (
          <li key={request.id} className="repair-request-item">
            <h4>{request.user}</h4>
            <p>Email: {request.email}</p>
            <p>Category: {request.category}</p>
            <p>Description: {request.description}</p>
            <p>Quote: {request.quote || "No quote yet"}</p>
            <p>Status: {request.status}</p>
            <button className="edit-button" onClick={() => handleEditClick(request)}>Edit</button>
          </li>
        ))}
      </ul>

      {/* Render Edit Status Modal */}
      <EditStatusModal />
    </div>
  );
}

export default RepairLanding;