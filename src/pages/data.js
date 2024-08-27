// data.js
import React, { createContext, useState } from 'react';

export const RepairContext = createContext();

export const RepairProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);

  // Function to add a new customer
  const addCustomer = (customer) => {
    setCustomers([...customers, { ...customer, id: customers.length + 1 }]);
  };

  // Function to update an existing customer
  const updateCustomer = (updatedCustomer) => {
    const updatedCustomers = customers.map((customer) =>
      customer.id === updatedCustomer.id ? updatedCustomer : customer
    );
    setCustomers(updatedCustomers);
  };

  // Function to delete a customer
  const deleteCustomer = (customerId) => {
    const updatedCustomers = customers.filter((customer) => customer.id !== customerId);
    setCustomers(updatedCustomers);
  };

  return (
    <RepairContext.Provider value={{ customers, addCustomer, updateCustomer, deleteCustomer }}>
      {children}
    </RepairContext.Provider>
  );
};