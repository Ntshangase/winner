import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import './Timeline.css'; // Import the CSS file for styling
import Modal from './Modal'; // Import the Modal component

function Timeline() {
  // Sample data for customer orders
  const [orders] = useState([
    { id: 1, device: 'Laptop', stage: 'Pending', description: 'Screen replacement' },
    { id: 2, device: 'Phone', stage: 'In Progress', description: 'Battery replacement' },
    { id: 3, device: 'Tablet', stage: 'Ready for Collection', description: 'Charging port repair' },
    { id: 4, device: 'Desktop', stage: 'Complete', description: 'Hard drive replacement' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <div className="timeline-container">
      <Navbar />
      <h2 className="timeline-title">Order Timeline</h2>
      <div className="order-card-container">
        {orders.map((order) => (
          <div className="order-card" key={order.id} onClick={() => handleOrderClick(order)}>
            <h3 className="order-device">{order.device}</h3>
            <span className={`order-stage ${order.stage.replace(/\s+/g, '')}`}>
              {order.stage}
            </span>
            <p className="order-description">{order.description}</p>
          </div>
        ))}
      </div>

      {/* Render Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} order={selectedOrder} />
    </div>
  );
}

export default Timeline;