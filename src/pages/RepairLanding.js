import React, { useState, useEffect } from 'react';
import RepairNavbar from '../Components/RepairNavbar'; // Corrected import
import './RepairLanding.css'; // Import the CSS file for styling
import { firestore } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore"; // Import Firestore functions

function RepairLanding() {
  const [repairRequests, setRepairRequests] = useState([]);

  useEffect(() => {
    const repairRequestsCollection = collection(firestore, "messages");

    // Set up real-time listener
    const unsubscribe = onSnapshot(repairRequestsCollection, (snapshot) => {
      const repairRequestsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRepairRequests(repairRequestsList);
    });

    // Clean up the listener on unmount
    return () => unsubscribe();
  }, []);

  const handleEdit = (id) => {
    // Handle the edit button click event
    console.log(`Edit request with id: ${id}`);
    // You can add logic to open a modal or navigate to an edit page
  };

  return (
    <div className="repair-landing-container">
      <RepairNavbar />
      <h2 className="repair-landing-title">Repair Requests</h2>
      <ul className="repair-requests-list">
        {repairRequests.map(request => (
          <li key={request.id} className="repair-request-item">
            <div className="content">
              <h3>{request.name}</h3>
              <p>{request.description}</p>
              <span className="tag" style={{ background: getStatusColor(request.status) }}>
                {request.status}
              </span>
            </div>
            {request.imageUrl && (
              <div className="image-container">
                <img src={request.imageUrl} alt={request.device} className="repair-image" />
                <button className="edit-button" onClick={() => handleEdit(request.id)}>Edit</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Helper function to get color based on status
const getStatusColor = (status) => {
  switch (status) {
    case 'Pending':
      return '#ff9800';
    case 'In Progress':
      return '#2196f3';
    case 'Ready for Collection':
      return '#4caf50';
    default:
      return '#9e9e9e';
  }
};

export default RepairLanding;