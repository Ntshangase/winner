import React, { useState } from 'react';
import RepairNavbar from '../Components/RepairNavbar';
import { firestore } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import './SearchQuote.css';

function SearchQuote() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      // Clear previous order and error
      setOrder(null);
      setError(null);

      // Query Firestore collection for documents where the tracking number matches
      const ordersRef = collection(firestore, "messages");
      const q = query(ordersRef, where("trackingNumber", "==", trackingNumber));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const matchedOrder = querySnapshot.docs[0].data();
        setOrder(matchedOrder); 
      } else {
        setOrder(null); 
        setError("No order found with that tracking number.");
      }
    } catch (error) {
      console.error("Error fetching order:", error);
      setError("Error fetching order. Please try again later.");
    }
  };

  return (
    <div className="search-quote-container">
      <RepairNavbar />
      <h1 className="search-quote-title">Seach Order</h1>
      <p>Update a customer ticket by searching for the tracking number.</p>
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
          {order.quote && <p><strong>Quote:</strong> R {order.quote}</p>}
          {order.trackingNumber && <p><strong>Tracking Number:</strong> {order.trackingNumber}</p>}
        </div>
      ) : (
        error && <p className="error-message">{error}</p>
      )}
    </div>
  );
}

export default SearchQuote;