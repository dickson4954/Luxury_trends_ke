import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TrendingNow.css';

import chandelier1 from '../Images/PL.webp';
import chandelier2 from '../Images/PL-2.webp';
import pendantLight from '../Images/PL-3.webp';
import ceilingLight from '../Images/PL-4.webp';
import trackLighting from '../Images/PL.webp';
import electricalInspiration from '../Images/garden 4.webp'; 

const trendingItems = [
  {
    title: 'Modern Crystal Chandelier | 6-Light | Dimmable LED',
    image: chandelier1,
    price: 'KSh12,499.00',
    onSale: true,
  },
  {
    title: 'Contemporary LED Chandelier with Remote Control',
    image: chandelier2,
    price: 'KSh15,999.00',
    onSale: true,
  },
  {
    title: 'Industrial Pendant Light | Adjustable Hanging Lamp',
    image: pendantLight,
    price: 'KSh3,499.00',
    onSale: true,
  },
  {
    title: 'Smart Ceiling Light | Wi-Fi Enabled | Color Changing',
    image: ceilingLight,
    price: 'KSh8,999.00',
    oldPrice: 'KSh11,500.00',
    onSale: true,
  },
  {
    title: 'Track Lighting System | 4 Heads | Adjustable Spotlights',
    image: trackLighting,
    price: 'KSh6,499.00',
    onSale: true,
  },
];

const TrendingNow = () => {
  const navigate = useNavigate();

  return (
    <section className="trending-now">
      <header className="trending-header">
        <h2 className="trending-title">Trending Electrical Products</h2>
        <button
          className="view-all-button"
          onClick={() => navigate('/trending')}
          aria-label="View all trending electrical products"
        >
          View All
        </button>
      </header>

      <div className="trending-grid">
        {trendingItems.map((item, index) => (
          <article className="trending-card" key={index} tabIndex="0" aria-label={item.title}>
            {item.onSale && <span className="sale-badge">Sale</span>}
            <img
              src={item.image}
              alt={item.title}
              className="trending-image"
              loading="lazy"
            />
            <p className="trending-title-text">{item.title}</p>
            <p className="trending-price">{item.price}</p>
            {item.oldPrice && <p className="trending-old-price">{item.oldPrice}</p>}
          </article>
        ))}
      </div>

     
      <section className="inspiration-section" aria-labelledby="inspiration-heading">
        <div className="inspiration-content">
          <div className="inspiration-image">
            <img
              src={electricalInspiration}
              alt="Modern Electrical Lighting Solutions"
              loading="lazy"
            />
          </div>
          <div className="inspiration-text">
            <h2 id="inspiration-heading">Illuminate Your Space...</h2>
            <p>
              Transform your home or office with our premium electrical lighting solutions. 
              From energy-efficient LED fixtures to smart lighting systems, discover the perfect 
              illumination to enhance your space's ambiance and functionality.
            </p>
            <a href="#shop" className="shop-now-btn" aria-label="Shop electrical products now">
              Shop Lighting
            </a>
          </div>
        </div>
      </section>
    </section>
  );
};

export default TrendingNow;