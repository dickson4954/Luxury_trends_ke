// src/pages/CartPage.js
import React, { useState } from 'react';
import './CartPage.css'; // Create this file

const CartPage = () => {
  return (
    <div className="cart-page">
      <div className="cart-page-container">
        <div className="cart-page-header">
          <h1>Your Shopping Cart</h1>
          <div className="cart-summary-header">
            <span>0 items</span>
            <span className="total-amount">Total: KSh0</span>
          </div>
        </div>

        <div className="cart-page-body">
          <div className="empty-cart-page">
            <div className="empty-cart-content">
              <img
                src="https://i.pinimg.com/736x/3d/5c/e8/3d5ce8662dac6c2e92a2ffd9f4b96d36.jpg"
                alt="Empty cart"
                className="empty-cart-icon"
              />
              <h2>Your cart is empty</h2>
              <p>Looks like you haven't added any products to your cart yet.</p>
              <button 
                className="start-shopping-btn" 
                onClick={() => window.location.href = '/products'}
              >
                Start Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;