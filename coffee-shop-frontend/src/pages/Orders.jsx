import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { OrderContext } from '../context/OrderContext';
import './Orders.css';
import axios from 'axios';

function Orders() {
  const { orders, setOrders } = useContext(OrderContext);
  const [showCheckout, setShowCheckout] = useState(false);

  const handleDelete = (index) => {
    setOrders(orders.filter((_, i) => i !== index));
  };

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const closeCheckout = () => {
    setShowCheckout(false);
  };

  // Calculate the total cost of the order
  const total = orders.reduce((acc, item) => {
    const price = parseFloat(item.price);
    return acc + (isNaN(price) ? 0 : price);
  }, 0).toFixed(2);

  const handleSubmitCheckout = async (e) => {
    e.preventDefault();
    try {
      const orderDetails = {
        name: e.target[0].value,
        email: e.target[1].value,
        address: e.target[2].value,
        items: orders,
        total: total,
      };

      const response = await axios.post('http://localhost:5000/api/orders', orderDetails);

      if (response.status === 201) {
        alert('Order submitted successfully!');
        setOrders([]);
        setShowCheckout(false);
      } else {
        throw new Error('Failed to submit order');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Failed to submit order. Please try again.');
    }
  };

  return (
    <div className="orders-page">
      <h1>Your Orders</h1>
      {orders.length === 0 ? (
        <p className="empty-orders">
          No items in your order. 
          <Link to="/menu" className="back-to-menu-button">Go Back to Menu</Link>
        </p>
      ) : (
        <>
          <ul className="orders-list">
            {orders.map((item, index) => (
              <li key={index} className="order-item">
                <span className="order-item-name">{item.name}</span>
                <span className="order-item-price">${isNaN(parseFloat(item.price)) ? "0.00" : parseFloat(item.price).toFixed(2)}</span>
                <button className="delete-button" onClick={() => handleDelete(index)}>Delete</button>
              </li>
            ))}
          </ul>
          <div className="orders-total">Total: ${total}</div>
          <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
        </>
      )}

      {showCheckout && (
        <div className="checkout-modal">
          <form className="checkout-form" onSubmit={handleSubmitCheckout}>
            <h2>Checkout</h2>
            <input type="text" placeholder="Full Name" required />
            <input type="email" placeholder="Email" required />
            <textarea placeholder="Delivery Address" required></textarea>
            <button type="submit" className="checkout-submit">Submit Order</button>
            <button type="button" onClick={closeCheckout} className="cancel-button">Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Orders;
