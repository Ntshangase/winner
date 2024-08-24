// import React from 'react'
// import Navbar from '../Components/Navbar'
import React, { useState } from 'react';

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
    // Add the new repair request to the list
    setRepairRequests([...repairRequests, { ...formData, status: 'Pending' }]);
    // Reset form fields
    setFormData({ name: '', email: '', device: '', description: '' });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Track My Repair</h1>

      {/* Repair Request Form */}
      <h2>Submit a Repair Request</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          style={{ margin: '10px 0', padding: '10px', width: '100%' }}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          style={{ margin: '10px 0', padding: '10px', width: '100%' }}
          required
        />
        <input
          type="text"
          name="device"
          placeholder="Device Type"
          value={formData.device}
          onChange={handleChange}
          style={{ margin: '10px 0', padding: '10px', width: '100%' }}
          required
        />
        <textarea
          name="description"
          placeholder="Describe the issue"
          value={formData.description}
          onChange={handleChange}
          style={{ margin: '10px 0', padding: '10px', width: '100%' }}
          required
        />
        <button type="submit" style={{ padding: '10px 20px', fontSize: '16px' }}>
          Submit Request
        </button>
      </form>

      {/* Repair Status Section */}
      <h2>Your Repair Requests</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {repairRequests.length > 0 ? (
          repairRequests.map((request, index) => (
            <li key={index} style={{ padding: '10px', border: '1px solid #ccc', margin: '10px 0' }}>
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