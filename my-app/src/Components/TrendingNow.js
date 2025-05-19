import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TrendingNow.css';

import humidifier from '../Images/tier.jpeg';
import kitchenToy from '../Images/wall.jpg';
import towelRack from '../Images/cutlery.jpg';
import glassSet from '../Images/layer.jpeg';
import laptopTable from '../Images/flameless.jpeg';
import inspirationImage from '../Images/piration.jpg'; 

const trendingItems = [
  {
    title: 'Cool Mist Humidifier | 2.2L | For Office, Indoor Plants...',
    image: humidifier,
    price: 'KSh3,499.00',
    onSale: true,
  },
  {
    title: 'Kid Kitchen Toddler Wooden Pretend Cooking Set...',
    image: kitchenToy,
    price: 'KSh3,499.00',
    onSale: true,
  },
  {
    title: 'Bathroom wall mounted towel rack accessory with hooks',
    image: towelRack,
    price: 'KSh3,499.00',
    onSale: true,
  },
  {
    title: 'Glass goblet, 370 ML Snifter Glasses | Set of 6',
    image: glassSet,
    price: 'KSh1,999.00',
    oldPrice: 'KSh2,500.00',
    onSale: true,
  },
  {
    title: 'Adjustable Tilting Laptop Folding Table Stand Desk...',
    image: laptopTable,
    price: 'KSh3,499.00',
    onSale: true,
  },
];

const TrendingNow = () => {
  const navigate = useNavigate();

  return (
    <section className="trending-now">
      <header className="trending-header">
        <h2 className="trending-title">Trending Now</h2>
        <button
          className="view-all-button"
          onClick={() => navigate('/trending')}
          aria-label="View all trending products"
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
              src={inspirationImage}
              alt="Home Inspiration"
              loading="lazy"
            />
          </div>
          <div className="inspiration-text">
            <h2 id="inspiration-heading">Stay Inspired...</h2>
            <p>
              Looking to refresh your space or add a touch of personality? Discover unique pieces
              that elevate your home's style effortlessly. From cozy accents to bold statement decor,
              find everything you need to express your vibe.
            </p>
            <a href="#shop" className="shop-now-btn" aria-label="Shop now">
              Shop Now
            </a>
          </div>
        </div>
      </section>
    </section>
  );
};

export default TrendingNow;
