import React, { useState } from 'react';
import './TrendingAll.css';
import { useCart } from '../Components/CartContext';
import Cart from '../Components/Cart';

// Import the same images from TrendingNow
import chandelier1 from '../Images/PL.webp';
import chandelier2 from '../Images/PL-2.webp';
import pendantLight from '../Images/PL-3.webp';
import ceilingLight from '../Images/PL-4.webp';
import trackLighting from '../Images/PL.webp';
import outdoorLight from '../Images/garden 4.webp';
import panelLight from '../Images/PL-2.webp';
import emergencyLight from '../Images/PL-3.webp';

const trendingItems = [
  {
    id: 'e1',
    name: 'Modern Crystal Chandelier | 6-Light Dimmable LED',
    slug: 'modern-crystal-chandelier',
    description: 'Elegant crystal chandelier with 6 LED lights, dimmable feature and remote control for modern homes.',
    images: [chandelier1],
    price: 12499,
    onSale: true,
  },
  {
    id: 'e2',
    name: 'Smart Wi-Fi Ceiling Light | Color Changing RGB',
    slug: 'smart-wifi-ceiling-light',
    description: 'Wi-Fi enabled smart ceiling light with RGB color changing capabilities and app control.',
    images: [ceilingLight],
    price: 8999,
    onSale: true,
  },
  {
    id: 'e3',
    name: 'Industrial Pendant Light | Adjustable Hanging Lamp',
    slug: 'industrial-pendant-light',
    description: 'Vintage-style industrial pendant light with adjustable height, perfect for kitchen islands and dining areas.',
    images: [pendantLight],
    price: 3499,
    onSale: true,
  },
  {
    id: 'e4',
    name: 'Track Lighting System | 4 Adjustable Spotlights',
    slug: 'track-lighting-system',
    description: 'Modern track lighting system with 4 adjustable spotlights, ideal for highlighting artwork or room features.',
    images: [trackLighting],
    price: 6499,
    oldPrice: 7999,
    onSale: true,
  },
  {
    id: 'e5',
    name: 'LED Panel Light | 600x600mm Office Ceiling Light',
    slug: 'led-panel-light',
    description: 'Energy-efficient LED panel light for office and commercial spaces, easy installation and uniform lighting.',
    images: [panelLight],
    price: 4499,
    onSale: true,
  },
  {
    id: 'e6',
    name: 'Outdoor Wall Sconce | Weatherproof IP65',
    slug: 'outdoor-wall-sconce',
    description: 'Weatherproof outdoor wall sconce with IP65 rating, perfect for exterior walls and garden lighting.',
    images: [outdoorLight],
    price: 2999,
    oldPrice: 3799,
    onSale: true,
  },
  {
    id: 'e7',
    name: 'Recessed Downlights | 6-inch LED Can Lights',
    slug: 'recessed-downlights',
    description: 'Set of 4 recessed LED downlights with adjustable trim, ideal for modern ceiling installations.',
    images: [chandelier2],
    price: 5599,
    onSale: true,
  },
  {
    id: 'e8',
    name: 'Emergency Exit Light | Battery Backup',
    slug: 'emergency-exit-light',
    description: 'LED emergency exit sign with battery backup, compliant with safety regulations for commercial buildings.',
    images: [emergencyLight],
    price: 1899,
    onSale: true,
  }
];

const TrendingAll = () => {
  const { addToCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (item) => {
    // Add with quantity 1, uniquely identified by id
    addToCart({ ...item, quantity: 1 });
    setIsCartOpen(true);
  };

  return (
    <section className="trending-all-page">
      <header>
        <h1 className="page-title">Trending Electrical Products</h1>
        <p className="page-subtitle">Discover our most popular lighting solutions and electrical fixtures</p>
      </header>

      <div className="products-grid">
        {trendingItems.map((item) => (
          <article
            className="product-card"
            key={item.id}
            tabIndex="0"
            aria-label={item.name}
          >
            {item.onSale && <span className="sale-badge">Sale</span>}

            <div className="image-wrapper">
              <img
                src={item.images[0]}
                alt={item.name}
                loading="lazy"
                className="product-image"
              />
            </div>

            <h3 className="product-title">{item.name}</h3>
            
            <p className="product-description">{item.description}</p>

            <p className="price">
              <span className="current-price">KSh{item.price.toLocaleString()}</span>
              {item.oldPrice && (
                <span className="old-price">KSh{item.oldPrice.toLocaleString()}</span>
              )}
            </p>

            <button
              className="btn-primary"
              onClick={() => handleAddToCart(item)}
              aria-label={`Add ${item.name} to cart`}
            >
              Add to Cart
            </button>
          </article>
        ))}
      </div>

      {isCartOpen && <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />}
    </section>
  );
};

export default TrendingAll;