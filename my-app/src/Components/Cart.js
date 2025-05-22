import React, { useState } from 'react';
import './Cart.css';
import { FaTimes, FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Components/CartContext';
import productsData from './Products';
import OrderNowModal from './OrderNowModal';

const Cart = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQty, addToCart } = useCart();

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const handleStartShopping = () => {
    onClose();
    navigate('/products');
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const suggestedProducts = productsData
    .filter((p) => !cartItems.find((ci) => ci.id === p.id))
    .slice(0, 3);

  return (
    <>
      <div className={`cart-panel ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Your cart</h2>
          <a onClick={handleStartShopping} className="view-cart">
            View cart
          </a>
          <button className="close-btn" onClick={onClose} aria-label="Close cart">
            <FaTimes />
          </button>
        </div>

        <div className="cart-body">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <img
                src="https://i.pinimg.com/736x/3d/5c/e8/3d5ce8662dac6c2e92a2ffd9f4b96d36.jpg"
                alt="Empty cart"
                className="empty-cart-icon"
              />
              <p>Your cart is empty</p>
              <button className="start-shopping-btn" onClick={handleStartShopping}>
                Start shopping
              </button>
            </div>
          ) : (
            <>
              <ul className="cart-items">
                {cartItems.map((item) => (
                  <li key={item.id} className="cart-item">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="cart-item-thumbnail"
                    />
                    <div className="cart-item-details">
                      <p className="brand-name">Luxury_trends_ke</p>
                      <h4 className="item-name">{item.name}</h4>
                      <div className="price-section">
                        <span className="current-price">
                          KSh{item.price.toLocaleString()}
                        </span>
                        <span className="old-price">
                          KSh{(item.oldPrice || item.price * 1.6).toLocaleString()}
                        </span>
                      </div>
                      <div className="qty-controls">
                        <button
                          onClick={() =>
                            updateQty(item.id, Math.max(1, item.quantity - 1))
                          }
                        >
                          <FaMinus />
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQty(item.id, item.quantity + 1)}>
                          <FaPlus />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="delete-btn"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="suggested-products">
                <h3>You may also like...</h3>
                <div className="suggested-list">
                  {suggestedProducts.map((p) => (
                    <div key={p.id} className="suggested-item">
                      <img src={p.images[0]} alt={p.name} />
                      <p>{p.name}</p>
                      <span>KSh{p.price}</span>
                      <button onClick={() => addToCart({ ...p, quantity: 1 })}>
                        Add
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="note-shipping-section">
                <a href="#">Add order note</a>
                <span>
                  Taxes, discounts and <a href="#">shipping</a> calculated at checkout.
                </span>
              </div>

              <button
                className="order-now-btn"
                onClick={() => setIsOrderModalOpen(true)}
              >
                🛍️ Order Now
              </button>
              <button className="checkout-btn">
                🧾 Checkout - KSh{totalAmount.toLocaleString()}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Modal rendered OUTSIDE cart-panel for centered overlay */}
      {isOrderModalOpen && (
        <OrderNowModal
          items={cartItems}
          onClose={() => setIsOrderModalOpen(false)}
        />
      )}
    </>
  );
};

export default Cart;
