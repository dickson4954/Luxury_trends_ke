import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetails.css';
import { FaShoppingBag, FaArrowLeft, FaMoneyBillWave } from 'react-icons/fa';
import productsData from '../Components/Products';
import { useCart } from '../Components/CartContext';
import Cart from '../Components/Cart';
import OrderNowModal from '../Components/OrderNowModal';

export default function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = productsData.find(p => p.slug === slug);
  const [qty, setQty] = useState(1);
  const [currentImg, setCurrentImg] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);

  const { addToCart } = useCart();

  if (!product) return <div className="not-found">Product not found.</div>;

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: qty });
    setIsCartOpen(true);
  };

  const handlePayNow = () => {
    const order = {
      name: 'Guest',
      phone: '',
      location: '',
      items: [{ ...product, quantity: qty }],
      subtotal: product.price * qty,
      shipping: 0, // Free delivery
      total: product.price * qty,
      discountCode: '',
      subscribed: false,
      paymentMethod: 'PayNow',
    };

    localStorage.setItem("latestOrder", JSON.stringify(order));
    window.dispatchEvent(new Event("orderUpdated"));
    navigate('/payment');
  };

  return (
    <div className="product-details-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Back
      </button>

      <div className="product-details-container">
        <div className="product-images">
          <img
            src={product.images[currentImg]}
            alt={product.name}
            className="main-image"
          />
          <div className="thumbnail-row">
            {product.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className={`thumbnail ${idx === currentImg ? 'active' : ''}`}
                onClick={() => setCurrentImg(idx)}
              />
            ))}
          </div>
        </div>

        <div className="product-info">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-price">KSh{product.price.toLocaleString()}</p>
          <p className="shipping-note">Shipping calculated at checkout.</p>
          <p className="product-description">{product.description}</p>

          <div className="quantity-section">
            <span>Quantity:</span>
            <div className="quantity-selector">
              <button onClick={() => setQty(prev => Math.max(1, prev - 1))}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty(prev => prev + 1)}>＋</button>
            </div>
          </div>

          <div className="action-buttons">
            <button className="btn add-to-cart" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="btn order-now" onClick={() => setShowOrderModal(true)}>
              <FaShoppingBag /> Order Now
            </button>
            <button className="btn pay-online" onClick={handlePayNow}>
              <FaMoneyBillWave /> Pay Now & Get Free Delivery!
            </button>
          </div>
        </div>
      </div>

      {isCartOpen && <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />}

      {showOrderModal && (
        <OrderNowModal
          product={product}
          quantity={qty}
          onClose={() => setShowOrderModal(false)}
        />
      )}
    </div>
  );
}
