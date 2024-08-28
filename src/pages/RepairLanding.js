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
  };

  const handleStatusChange = (requestId, newStatus) => {
    setRepairRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === requestId ? { ...request, status: newStatus } : request
      )
    );
  };

  return (
    <div className="repair-landing-container">
      <RepairNavbar />
      <h2 className="repair-landing-title">Admin Dashboard</h2>
      <h3>Repair Requests</h3>
      <table className="repair-requests-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Device</th>
            <th>Status</th>
            <th>Description</th>
            <th>Quote</th>
          </tr>
        </thead>
        <tbody>
          {repairRequests.map((request) => (
            <tr key={request.id}>
              <td>{request.user}</td>
              <td>{request.device}</td>
              <td>
                <select
                  value={request.status}
                  onChange={(e) => handleStatusChange(request.id, e.target.value)}
                >
                  <option value="Order Received">Order Received</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Ready for Collection">Ready for Collection</option>
                </select>
              </td>
              <td>{request.description}</td>
              <td>{request.quote || "No quote yet"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Send Repair Quote</h3>
      <form className="send-quote-form" onSubmit={handleQuoteSubmit}>
        <label htmlFor="requestId">Select Repair Request ID:</label>
        <select
          name="requestId"
          value={quoteData.requestId}
          onChange={handleQuoteChange}
          required
        >
          <option value="">--Select Request--</option>
          {repairRequests.map((request) => (
            <option key={request.id} value={request.id}>
              {request.user} - {request.device}
            </option>
          ))}
        </select>

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

        <button type="submit">Send Quote</button>
      </form>
    </div>
  );
}

export default RepairLanding;