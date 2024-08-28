import React, { useState } from "react";
import RepairNavbar from "../Components/RepairNavbar";
import './RepairLanding.css'; 

function RepairLanding() {
  const [repairRequests, setRepairRequests] = useState([
    { id: 1, user: "John Doe", device: "Laptop", status: "In Progress", description: "Screen replacement", quote: "" },
    { id: 2, user: "Jane Smith", device: "Phone", status: "Completed", description: "Battery replacement", quote: "" },
  ]);

  const [quoteData, setQuoteData] = useState({
    requestId: "",
    quote: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

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

  const EditStatusModal = () => {
    const [newStatus, setNewStatus] = useState(selectedRequest?.status || '');

    const handleSave = () => {
      handleStatusChange(selectedRequest.id, newStatus);
      setIsModalOpen(false); // Close the modal after saving
    };

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
              <button type="submit">Save Changes</button>
              <button type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
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
      <table className="repair-requests-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Device</th>
            <th>Description</th>
            <th>Quote</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {repairRequests.map((request) => (
            <tr key={request.id}>
              <td>{request.user}</td>
              <td>{request.device}</td>
              <td>{request.description}</td>
              <td>{request.quote || "No quote yet"}</td>
              <td>
                <button onClick={() => handleEditClick(request)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Render Edit Status Modal */}
      <EditStatusModal />
    </div>
  );
}

export default RepairLanding;