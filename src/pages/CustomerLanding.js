import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import './CustomerLanding.css'; // Import the CSS file for styling
import { firestore, storage } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage"; // Import Firebase Storage functions
import { v4 as uuidv4 } from 'uuid'; // Import uuid for unique ID generation

const CustomerLanding = () => {
  const messagesRef = collection(firestore, "messages");

  const [repairRequests, setRepairRequests] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    device: '',
    description: '',
    category: '', // New category state
    image: null, // New image state
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] }); // Handle file upload
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Generate a tracking number using a combination of UUID and timestamp
    const trackingNumber = `TRK-${uuidv4().slice(0, 8)}-${Date.now()}`;

    // Create the new request object with the tracking number
    const newRequest = { 
      ...formData,
      status: 'Pending',
      trackingNumber: trackingNumber // Add tracking number here
    };

    try {
      // Upload image to Firebase Storage if an image is selected
      if (formData.image) {
        const imageRef = storageRef(storage, `images/${formData.image.name}`);
        await uploadBytes(imageRef, formData.image);
        const imageUrl = await getDownloadURL(imageRef);
        newRequest.imageUrl = imageUrl; // Add image URL to the request data
        delete newRequest.image; // Remove the image file from the request data
      }

      // Add the new request document to Firestore, with the tracking number
      await addDoc(messagesRef, newRequest);
      setRepairRequests([...repairRequests, newRequest]);

      // Reset form
      setFormData({ name: '', email: '', device: '', description: '', category: '', image: null });

    } catch (error) {
      console.error("Error adding document: ", error);
    }
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

        {/* Category Dropdown */}
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="Device Repair">Device Repair</option>
          <option value="Car Repair">Car Repair</option>
          <option value="Machinery Repair">Machinery Repair</option>
          <option value="Clothing Repair">Clothing Repair</option>
        </select>

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
        
        {/* Image Upload */}
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
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
              <strong>Category:</strong> {request.category} <br />
              <strong>Device:</strong> {request.device} <br />
              <strong>Status:</strong> {request.status} <br />
              <strong>Description:</strong> {request.description} <br />
              <strong>Tracking Number:</strong> {request.trackingNumber} <br />
              {request.imageUrl && (
                <div className="image-container">
                  <img src={request.imageUrl} alt="Uploaded" />
                </div>
              )}
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