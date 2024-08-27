import React, { useState } from "react";
import RepairNavbar from "../Components/RepairNavbar";

function RepairLanding() {
  // State to hold repair requests and quotes
  const [repairRequests, setRepairRequests] = useState([
    { id: 1, user: "John Doe", device: "Laptop", status: "In Progress", description: "Screen replacement", quote: "" },
    { id: 2, user: "Jane Smith", device: "Phone", status: "Completed", description: "Battery replacement", quote: "" },
  ]);

  // State to hold the quote input
  const [quoteData, setQuoteData] = useState({
    requestId: "",
    quote: "",
  });

  const handleQuoteChange = (e) => {
    setQuoteData({ ...quoteData, [e.target.name]: e.target.value });
  };

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    // Update the repair request with the quote
    setRepairRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === parseInt(quoteData.requestId)
          ? { ...request, quote: quoteData.quote }
          : request
      )
    );
    // Reset the form
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
    <div>
      <RepairNavbar />
      <div style={{ padding: "20px" }}>
        <h2>Admin Dashboard</h2>
        <h3>Repair Requests</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ccc", padding: "10px" }}>User</th>
              <th style={{ border: "1px solid #ccc", padding: "10px" }}>Device</th>
              <th style={{ border: "1px solid #ccc", padding: "10px" }}>Status</th>
              <th style={{ border: "1px solid #ccc", padding: "10px" }}>Description</th>
              <th style={{ border: "1px solid #ccc", padding: "10px" }}>Quote</th>
            </tr>
          </thead>
          <tbody>
            {repairRequests.map((request) => (
              <tr key={request.id}>
                <td style={{ border: "1px solid #ccc", padding: "10px" }}>{request.user}</td>
                <td style={{ border: "1px solid #ccc", padding: "10px" }}>{request.device}</td>
                <td style={{ border: "1px solid #ccc", padding: "10px" }}>
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
                <td style={{ border: "1px solid #ccc", padding: "10px" }}>{request.description}</td>
                <td style={{ border: "1px solid #ccc", padding: "10px" }}>{request.quote || "No quote yet"}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>Send Repair Quote</h3>
        <form onSubmit={handleQuoteSubmit} style={{ marginTop: "20px" }}>
          <label htmlFor="requestId">Select Repair Request ID:</label>
          <select
            name="requestId"
            value={quoteData.requestId}
            onChange={handleQuoteChange}
            required
            style={{ margin: "10px 0", padding: "10px", width: "100%" }}
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
            type="text"
            name="quote"
            value={quoteData.quote}
            onChange={handleQuoteChange}
            placeholder="Enter repair cost"
            required
            style={{ margin: "10px 0", padding: "10px", width: "100%" }}
          />

          <button type="submit" style={{ padding: "10px 20px", fontSize: "16px" }}>
            Send Quote
          </button>
        </form>
      </div>
    </div>
  );
}

export default RepairLanding;