import React, { useEffect, useState } from 'react';
import './PaymentPage.css';

export default function PaymentPage() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const storedOrder = localStorage.getItem("latestOrder");
    if (storedOrder) {
      setOrder(JSON.parse(storedOrder));
    }
  }, []);

  if (!order) {
    return <div className="payment-page"><h2>No order found</h2></div>;
  }

  return (
    <div className="payment-page">
      <div className="payment-container">
        <h2 className="payment-title">Confirm Your Order</h2>

        {/* Customer Info */}
        <div className="section">
          <h3>Customer Details</h3>
          <p><strong>Name:</strong> {order.name}</p>
          <p><strong>Phone:</strong> {order.phone}</p>
          <p><strong>Location:</strong> {order.location}</p>
        </div>

        {/* Product Summary */}
        <div className="section">
          <h3>Order Items</h3>
          {order.items.map(item => (
            <div key={item.id} className="payment-item">
              <img src={item.images[0]} alt={item.name} />
              <div className="item-details">
                <strong>{item.name}</strong>
                <p>KSh {item.price.toLocaleString()} x {item.quantity}</p>
                <p>Total: KSh {(item.price * item.quantity).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="section totals">
          <div className="total-row">
            <span>Subtotal:</span>
            <span>KSh {order.subtotal.toLocaleString()}</span>
          </div>
          <div className="total-row">
            <span>Shipping:</span>
            <span>{order.shipping === 0 ? 'FREE' : `KSh ${order.shipping.toLocaleString()}`}</span>
          </div>
          <div className="total-row total">
            <strong>Total:</strong>
            <strong>KSh {order.total.toLocaleString()}</strong>
          </div>
        </div>

        {/* Confirm Button */}
        <button className="confirm-button">
          Confirm & Proceed to Pay
        </button>
      </div>
    </div>
  );
}
