import React, { useState } from 'react';
import RepairNavbar from '../Components/RepairNavbar';
import { firestore } from "../firebase";
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import Modal from './Modal'; // Import the Modal component
import './SearchQuote.css'; // Import the CSS file

function SearchQuote() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // For handling the modal state
  const [selectedOrder, setSelectedOrder] = useState(null); // For holding the order to edit

  const handleSearch = async () => {
    try {
      setOrder(null);
      setError(null);

      const ordersRef = collection(firestore, "messages");
      const q = query(ordersRef, where("trackingNumber", "==", trackingNumber));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const matchedOrder = querySnapshot.docs[0];
        setOrder({ id: matchedOrder.id, ...matchedOrder.data() });
      } else {
        setOrder(null);
        setError("No order found with that tracking number.");
      }
    } catch (error) {
      console.error("Error fetching order:", error);
      setError("Error fetching order. Please try again later.");
    }
  };

  const handleEdit = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true); // Open the modal with the selected order
  };

  const handleSave = async (id, updatedData) => {
    const orderDoc = doc(firestore, "messages", id);
    await updateDoc(orderDoc, updatedData); // Update the Firestore document
    setIsModalOpen(false); // Close the modal
    setSelectedOrder(null); // Clear the selected order
    setOrder({ ...order, ...updatedData }); // Update order state with new data
  };

  const handleClose = () => {
    setIsModalOpen(false); // Close the modal without saving
    setSelectedOrder(null);
  };

  return (
    <div className="search-quote-container">
      <RepairNavbar />
      <h1 className="search-quote-title">Search and Update Order</h1>
      <p>Find and update a customer repair order by searching for its tracking number.</p>
      <input
        type="text"
        className="search-quote-input"
        value={trackingNumber}
        onChange={(e) => setTrackingNumber(e.target.value)}
        placeholder="Enter tracking number"
      />
      <button className="search-quote-button" onClick={handleSearch}>
        Search
      </button>

      {order ? (
        <div className="order-details-container">
          <h2>Order Details</h2>
          <p><strong>Customer Name:</strong> {order.name}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Description:</strong> {order.description}</p>
          {order.quote > 0 && <p><strong>Quote:</strong> R {order.quote}</p>}
          {order.trackingNumber && <p><strong>Tracking Number:</strong> {order.trackingNumber}</p>}

          <button className="edit-button" onClick={() => handleEdit(order)}>
            Edit
          </button>
        </div>
      ) : (
        error && <p className="error-message">{error}</p>
      )}

      {/* Modal for editing the order */}
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

export default SearchQuote;