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

  const handleCheckout = () => {
    const order = {
      name: 'Guest',
      phone: '',
      location: '',
      items: cartItems,
      subtotal: totalAmount,
      shipping: 0, // Free delivery
      total: totalAmount,
      discountCode: '',
      subscribed: false,
      paymentMethod: 'Checkout',
    };

    localStorage.setItem('latestOrder', JSON.stringify(order));
    window.dispatchEvent(new Event('orderUpdated'));
    onClose(); // close the cart panel
    navigate('/payment');
  };

  // Safe image getter utility
  const getImageSrc = (item) => {
    if (item?.images && Array.isArray(item.images) && item.images.length > 0) {
      return item.images[0];
    }
    if (item?.image) {
      return item.image;
    }
    // fallback image or empty string
    return '';
  };

  return (
    <>
      <div className={`cart-panel ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Your cart</h2>
          <a onClick={handleStartShopping} className="view-cart" tabIndex={0} role="button">
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
                      src={getImageSrc(item)}
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
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          <FaMinus />
                        </button>
                        <span aria-live="polite" aria-atomic="true">{item.quantity}</span>
                        <button
                          onClick={() => updateQty(item.id, item.quantity + 1)}
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          <FaPlus />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="delete-btn"
                          aria-label={`Remove ${item.name} from cart`}
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
                      <img src={getImageSrc(p)} alt={p.name} />
                      <p>{p.name}</p>
                      <span>KSh{p.price.toLocaleString()}</span>
                      <button
                        onClick={() => addToCart({ ...p, quantity: 1 })}
                        aria-label={`Add ${p.name} to cart`}
                      >
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

              {/* Only open modal if cartItems exist and length > 0 */}
              <button
                className="order-now-btn"
                onClick={() => {
                  if (cartItems.length > 0) {
                    setIsOrderModalOpen(true);
                  }
                }}
                aria-disabled={cartItems.length === 0}
              >
                🛍️ Order Now
              </button>

              <button
                className="checkout-btn"
                onClick={handleCheckout}
                disabled={cartItems.length === 0}
              >
                🧾 Checkout - KSh{totalAmount.toLocaleString()}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Pass items only if cartItems has elements */}
      {isOrderModalOpen && cartItems.length > 0 && (
        <OrderNowModal
          items={cartItems}
          onClose={() => setIsOrderModalOpen(false)}
        />
      )}
    </>
  );
};

export default Cart;
