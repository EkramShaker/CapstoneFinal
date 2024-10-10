import React, { createContext, useState } from 'react';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);

  const addItemToOrder = (item) => {
    setOrders((prevOrders) => [...prevOrders, item]);
  };

  return (
    <OrderContext.Provider value={{ orders, setOrders, addItemToOrder, user, setUser }}>
      {children}
    </OrderContext.Provider>
  );
};
