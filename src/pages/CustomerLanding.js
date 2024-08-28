import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import './CustomerLanding.css'; // Import the CSS file for styling

const CustomerLanding = () => {
  const [repairRequests, setRepairRequests] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    device: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRepairRequests([...repairRequests, { ...formData, status: 'Pending' }]);
    setFormData({ name: '', email: '', device: '', description: '' });
  };

  return (
    <div className="customer-landing-container">
      <Navbar />

      {/* Repair Request Form */}
      <form className="repair-request-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Submit a Repair Request</h2>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="device"
          placeholder="Device Type"
          value={formData.device}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Describe the issue"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <button type="submit" className="submit-button">
          Submit Request
        </button>
      </form>

      {/* Repair Status Section */}
      <h2 className="status-title">Your Repair Requests</h2>
      <ul className="repair-requests-list">
        {repairRequests.length > 0 ? (
          repairRequests.map((request, index) => (
            <li key={index} className="repair-request-item">
              <strong>Device:</strong> {request.device} <br />
              <strong>Status:</strong> {request.status} <br />
              <strong>Description:</strong> {request.description}
            </li>
          ))
        ) : (
          <li>No repair requests submitted yet.</li>
        )}
      </ul>
    </div>
  );
};

export default CustomerLanding;