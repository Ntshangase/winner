import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import { database } from '../firebase'; 

function Timeline() {
  // State to hold orders
  const [orders, setOrders] = useState([]);

  // Fetch orders from Firebase on component mount
  console.log(database.ref);
  useEffect(() => {
    const fetchOrders = async () => {
      const snapshot = await database.ref('orders').once('value');
      const data = snapshot.val();
      const ordersList = data ? Object.values(data) : [];
      setOrders(ordersList);
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    // Update the status in local state
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, stage: newStatus } : order
    );
    setOrders(updatedOrders);

    // Update the status in Firebase
    await database.ref(`orders/${orderId}`).update({
      stage: newStatus,
    });
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <h2>Order Timeline</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ccc', padding: '10px' }}>Device</th>
              <th style={{ border: '1px solid #ccc', padding: '10px' }}>Stage</th>
              <th style={{ border: '1px solid #ccc', padding: '10px' }}>Description</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td style={{ border: '1px solid #ccc', padding: '10px' }}>{order.device}</td>
                <td style={{ border: '1px solid #ccc', padding: '10px' }}>
                  <select
                    value={order.stage}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="AssignedTechnician">Assigned Technician</option>
                    <option value="InProgress">In Progress</option>
                    <option value="readyForCollection">Ready for Collection</option>
                    <option value="complete">Complete</option>
                  </select>
                </td>
                <td style={{ border: '1px solid #ccc', padding: '10px' }}>{order.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Timeline;