import React from 'react';
import './TrendingNow.css';

import humidifier from '../Images/tier.jpeg';
import kitchenToy from '../Images/wall.jpg';
import towelRack from '../Images/cutlery.jpg';
import glassSet from '../Images/layer.jpeg';
import laptopTable from '../Images/flameless.jpeg';
import inspirationImage from '../Images/piration.jpg'; // replace with actual image file name

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
  return (
    <div className="trending-now">
      <div className="trending-header">
        <h2 className="trending-title">Trending Now</h2>
        <button className="view-all-button">View All</button>
      </div>
      <div className="trending-grid">
        {trendingItems.map((item, index) => (
          <div className="trending-card" key={index}>
            {item.onSale && <span className="sale-badge">Sale</span>}
            <img src={item.image} alt={item.title} className="trending-image" />
            <p className="trending-title-text">{item.title}</p>
            <p className="trending-price">{item.price}</p>
            {item.oldPrice && <p className="trending-old-price">{item.oldPrice}</p>}
          </div>
        ))}
      </div>

      {/* Inspiration Section */}
      <div className="inspiration-section">
        <div className="inspiration-content">
          <div className="inspiration-image">
            <img src={inspirationImage} alt="Home Inspiration" />
          </div>
          <div className="inspiration-text">
            <h2>Stay Inspired...</h2>
            <p>
              Looking to refresh your space or add a touch of personality? Discover unique pieces 
              that elevate your home's style effortlessly. From cozy accents to bold statement decor, 
              find everything you need to express your vibe.
            </p>
            <a href="#shop" className="shop-now-btn">Shop Now</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingNow;
