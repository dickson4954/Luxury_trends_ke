import React, { useState, useEffect } from 'react';
import './OrderNowModal.css';
import { FaUser, FaPhone, FaMapMarkerAlt, FaMoneyBillWave } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function OrderNowModal({ product, quantity = 1, items = [], onClose }) {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [discount, setDiscount] = useState('');
  const [subscribe, setSubscribe] = useState(false);

  // Helper to safely get image src
  const getImageSrc = (item) => {
    if (item.images && Array.isArray(item.images) && item.images.length > 0) {
      return item.images[0];
    }
    if (item.image) {
      return item.image;
    }
    return ''; // fallback image or empty string
  };

  const orderItems = items.length > 0
    ? items
    : product
      ? [{ ...product, quantity }]
      : [];

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 300;
  const total = subtotal + shipping;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  if (orderItems.length === 0) return null;

  const handleBuyNow = () => {
    if (!name || !phone || !location) {
      alert("Please fill in all fields before proceeding.");
      return;
    }

    const order = {
      name,
      phone,
      location,
      items: orderItems,
      subtotal,
      shipping: 0,
      total: subtotal,
      discountCode: discount,
      subscribed: subscribe,
    };

    localStorage.setItem("latestOrder", JSON.stringify(order));
    window.dispatchEvent(new Event("orderUpdated"));
    navigate("/payment");
  };

  const handlePayNow = () => {
    const order = {
      name: name || 'Guest',
      phone: phone || '',
      location: location || '',
      items: orderItems,
      subtotal,
      shipping: 0, // Free delivery
      total: subtotal,
      discountCode: discount,
      subscribed: subscribe,
      paymentMethod: 'PayNow',
    };

    localStorage.setItem("latestOrder", JSON.stringify(order));
    window.dispatchEvent(new Event("orderUpdated"));
    navigate("/payment");
  };

  return (
    <div className="order-modal-overlay" onClick={onClose}>
      <div className="order-modal" onClick={e => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose}>×</button>
        <h2>Please fill in the form to order</h2>

        {/* Order Summary */}
        <div className="order-summary">
          {orderItems.map(item => (
            <div key={item.id} className="order-summary-item product-row">
              <img src={getImageSrc(item)} alt={item.name} className="order-img" />
              <div className="product-details">
                <strong>{item.name}</strong>
                <p>KSh {item.price.toLocaleString()}</p>
                <p>Qty: {item.quantity}</p>
                <p>Subtotal: KSh {(item.price * item.quantity).toLocaleString()}</p>
              </div>
            </div>
          ))}

          <div className="order-summary-item">
            <span>Subtotal</span>
            <span>KSh {subtotal.toLocaleString()}</span>
          </div>
          <div className="order-summary-item">
            <span>Shipping</span>
            <span>KSh {shipping.toLocaleString()}</span>
          </div>
          <div className="order-summary-item total-row">
            <span>Total</span>
            <span>KSh {total.toLocaleString()}</span>
          </div>
        </div>

        {/* Input Fields */}
        <div className="input-group">
          <FaUser />
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <FaPhone />
          <input
            type="tel"
            placeholder="Your Phone Number"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
        </div>
        <div className="input-group">
          <FaMapMarkerAlt />
          <input
            type="text"
            placeholder="Delivery Location (e.g. Lavington, Nairobi)"
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
        </div>

        {/* Subscribe */}
        <div className="checkbox-group">
          <input
            type="checkbox"
            id="subscribe"
            checked={subscribe}
            onChange={e => setSubscribe(e.target.checked)}
          />
          <label htmlFor="subscribe">
            Subscribe to stay updated with new products and offers!
          </label>
        </div>

        {/* Discount Code */}
        <div className="discount-row">
          <input
            type="text"
            placeholder="Discount Code"
            value={discount}
            onChange={e => setDiscount(e.target.value)}
          />
          <button>Apply</button>
        </div>

        {/* Action Buttons */}
        <button className="buy-button" onClick={handleBuyNow}>BUY IT NOW</button>
        <button className="pay-button" onClick={handlePayNow}>
          <FaMoneyBillWave />
          Pay Now & Get Free Delivery
        </button>
      </div>
    </div>
  );
}
