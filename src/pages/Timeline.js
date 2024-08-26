import React, { useState } from 'react';
import Navbar from '../Components/Navbar';

function Timeline() {
  // Sample data for customer orders
  const [orders] = useState([
    { id: 1, device: 'Laptop', stage: 'Pending', description: 'Screen replacement' },
    { id: 2, device: 'Phone', stage: 'InProgress', description: 'Battery replacement' },
    { id: 3, device: 'Tablet', stage: 'readyForCollection', description: 'Charging port repair' },
    { id: 4, device: 'Desktop', stage: 'complete', description: 'Hard drive replacement' },
  ]);

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
                  <span
                    style={{
                      padding: '5px 10px',
                      borderRadius: '5px',
                      backgroundColor:
                        order.stage === 'Pending'
                          ? '#ffc107'
                          : order.stage === 'AssignedTechnician'
                          ? '#007bff'
                          : order.stage === 'InProgress'
                          ? '#28a745'
                          : order.stage === 'readyForCollection'
                          ? '#6c757d'
                          : '#dc3545',
                      color: '#fff',
                    }}
                  >
                    {order.stage}
                  </span>
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