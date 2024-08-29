import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import './Timeline.css'; // Import the CSS file for styling
import Modal from './Modal'; // Import the Modal component
import excavatorImage from '../images/excavator repair.jpg';
import jacketImage from '../images/jacket.jpg';
import car from '../images/car repair.jpg';
import laptop from '../images/screen repair.jpg';

function Timeline() {
  // Sample data for customer orders
  const [orders] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      category: 'Device Repair',
      device: 'Laptop',
      stage: 'Pending',
      description: 'Screen replacement',
      image: laptop,
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      category: 'Car Repair',
      device: 'Car',
      stage: 'In Progress',
      description: 'Engine repair',
      image: car, 
    },
    {
      id: 3,
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      category: 'Machinery Repair',
      device: 'Excavator',
      stage: 'Ready for Collection',
      description: 'Hydraulic system repair',
      image: excavatorImage, 
    },
    {
      id: 4,
      name: 'Bob Brown',
      email: 'bob.brown@example.com',
      category: 'Clothing Repair',
      device: 'Jacket',
      stage: 'Complete',
      description: 'Zipper replacement',
      image: jacketImage, 
    },
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
            <p className="order-name"><strong>Name:</strong> {order.name}</p>
            <p className="order-email"><strong>Email:</strong> {order.email}</p>
            <p className="order-category"><strong>Category:</strong> {order.category}</p>
            {order.image && (
              <img src={order.image} alt={`${order.device}`} className="order-image" />
            )}
          </div>
        ))}
      </div>

      {/* Render Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} order={selectedOrder} />
    </div>
  );
}

export default Timeline;