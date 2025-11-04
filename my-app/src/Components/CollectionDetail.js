import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CollectionDetail.css';

// Import images for the collection
import cables from '../Images/cables.webp';
import fans from '../Images/fans.webp';
import gardenLights from '../Images/garden1.webp';
import adaptors from '../Images/adaptor.webp';
import gateLights from '../Images/gate.webp';
import chandeliers from '../Images/chandalier.webp';
import solar from '../Images/solar.webp';

import { useCart } from '../Components/CartContext';
import Cart from '../Components/Cart';
import OrderNowModal from '../Components/OrderNowModal';

// Collection info with descriptions
const collectionInfo = {
  cables: {
    title: "Cables",
    description:
      "Explore our wide range of high-quality cables for all your electrical needs. From power cables to data cables, we have everything to keep your devices connected and powered.",
    image: cables,
  },
  fans: {
    title: "Fans & Accessories",
    description:
      "Stay cool and comfortable with our variety of fans and accessories. Whether it’s ceiling fans, standing fans, or air circulators, we have the perfect cooling solution for every space.",
    image: fans,
  },
  "garden-lights": {
    title: "Garden Lights",
    description:
      "Brighten up your garden with stylish outdoor lights. From solar-powered lanterns to elegant garden spotlights, create the perfect atmosphere for your outdoor space.",
    image: gardenLights,
  },
  adaptors: {
    title: "Adaptors & Extensions",
    description:
      "Ensure all your devices are powered with our reliable adaptors and extension cords. Perfect for home and office use, these accessories provide flexibility and convenience.",
    image: adaptors,
  },
  "gate-lights": {
    title: "Gate Lights",
    description:
      "Illuminate your driveway or entrance with high-quality gate lights. These durable, weather-resistant lights ensure safety and add a touch of elegance to your property.",
    image: gateLights,
  },
  chandeliers: {
    title: "Luxury Chandelier Lights",
    description:
      "Add a touch of luxury to your home with our elegant chandelier lights. From modern to classic designs, these lights will enhance any room with their beautiful lighting and style.",
    image: chandeliers,
  },
  "solar-lights": {
    title: "Solar Lights",
    description:
      "Go green with our solar lights. Powered by the sun, these eco-friendly lights are perfect for illuminating your yard, garden, or pathways while reducing your energy bills.",
    image: solar,
  },
};

// List of products for each category
const allProducts = [
  { id: 'p1', name: 'Power Cable', image: cables, price: 20, category: 'cables' },
  { id: 'p2', name: 'Ceiling Fan', image: fans, price: 150, category: 'fans' },
  { id: 'p3', name: 'Solar Garden Light', image: gardenLights, price: 50, category: 'garden-lights' },
  { id: 'p4', name: 'Extension Cord', image: adaptors, price: 30, category: 'adaptors' },
  { id: 'p5', name: 'LED Gate Light', image: gateLights, price: 80, category: 'gate-lights' },
  { id: 'p6', name: 'Chandelier Light', image: chandeliers, price: 300, category: 'chandeliers' },
  { id: 'p7', name: 'Solar Powered Lamp', image: solar, price: 120, category: 'solar-lights' },
];

function CollectionDetail() {
  const { type } = useParams();
  const { addToCart } = useCart();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);

  // Fetch collection details based on the 'type' param in the URL
  const collection = collectionInfo[type?.toLowerCase()];
  
  // Filter products based on the collection category
  const filteredProducts = allProducts.filter(
    (product) => product.category.toLowerCase() === type.toLowerCase()
  );

  // If no collection is found, show a not found message
  if (!collection) return <p>Collection not found.</p>;

  const handleAddToCart = (product) => {
    addToCart({ ...product, quantity: 1 });
    setIsCartOpen(true);
  };

  const handleOrderNow = (product) => {
    setModalProduct({ ...product, quantity: 1 }); // Open modal with product
  };

  const closeModal = () => {
    setModalProduct(null);
  };

  return (
    <div className="collection-detail-page">
      <div className="collection-hero">
        <div className="collection-hero-text">
          <h1>{collection.title}</h1>
          <p>{collection.description}</p>
        </div>
        <img
          src={collection.image}
          alt={collection.title}
          className="collection-hero-image"
        />
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Ksh {product.price}</p>

            <div className="product-actions">
              <button
                className="btn-add-to-cart"
                onClick={() => handleAddToCart(product)}
                aria-label={`Add ${product.name} to cart`}
              >
                Add to Cart
              </button>

              <button
                className="btn-order-now"
                onClick={() => handleOrderNow(product)}
                aria-label={`Order ${product.name} now`}
              >
                Order Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {isCartOpen && <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />}

      {/* Order Now Modal */}
      {modalProduct && (
        <OrderNowModal
          product={modalProduct}
          quantity={modalProduct.quantity}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default CollectionDetail;
