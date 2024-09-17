import React, { useState, useEffect } from 'react';
import RepairNavbar from '../Components/RepairNavbar'; // Corrected import
import './RepairLanding.css'; // Import the CSS file for styling
import { firestore } from "../firebase";
import { collection, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore"; // Import Firestore functions
import Modal from './Modal'; // Import the Modal component

function RepairLanding() {
  const [repairRequests, setRepairRequests] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

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

  const handleEdit = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleSave = async (id, updatedData) => {
    const repairDoc = doc(firestore, "messages", id);
    await updateDoc(repairDoc, updatedData);
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(firestore, "messages", id)); // Delete document from Firestore
      setRepairRequests(repairRequests.filter(request => request.id !== id)); // Update state
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
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
              {request.quote > 0 && (
                <p className="quote">Quote: R {request.quote}</p>
              )}
            </div>
            {request.imageUrl && (
              <div className="image-container">
                <img src={request.imageUrl} alt={request.device} className="repair-image" />
                <button className="edit-button" onClick={() => handleEdit(request)}>Edit</button>
                <button className="delete-button" onClick={() => handleDelete(request.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      {selectedOrder && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleClose}
          order={selectedOrder}
          onSave={handleSave}
        />
      )}
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