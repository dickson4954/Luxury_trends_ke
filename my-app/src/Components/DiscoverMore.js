import React from 'react';
import './DiscoverMore.css';

import homeAccessoriesImg from '../Images/table-lamp.webp';
import bedroomImg from '../Images/switches.webp';
import kidsImg from '../Images/out-door.webp';
import kitchenImg from '../Images/bathroom-lights.webp';

const discoverCategories = [
  {
    title: 'Table Lamp',
    image: homeAccessoriesImg,
    items: [
      { name: 'LED Desk Lamp', link: '#' },
      { name: 'Rechargeable Table Light', link: '#' },
    ],
    shopLink: '#',
  },
  {
    title: 'Switches',
    image: bedroomImg,
    items: [
      { name: 'Smart Touch Switches', link: '#' },
      { name: 'Classic Wall Switches', link: '#' },
    ],
    shopLink: '#',
  },
  {
    title: 'Outdoor Lights',
    image: kidsImg,
    items: [
      { name: 'Flood Lights', link: '#' },
      { name: 'Solar Garden Lamps', link: '#' },
    ],
    shopLink: '#',
  },
  {
    title: 'Bathroom Lights',
    image: kitchenImg,
    items: [
      { name: 'Vanity Mirror Lights', link: '#' },
      { name: 'Waterproof Ceiling Lights', link: '#' },
    ],
    shopLink: '#',
  },
];

const DiscoverMore = () => {
  return (
    <div className="discover-more">
      <h2 className="discover-heading">Discover More</h2>
      <div className="discover-grid">
        {discoverCategories.map((category, index) => (
          <div className="discover-card" key={index}>
            <img
              src={category.image}
              alt={category.title}
              className="discover-image"
            />
            <div className="discover-content">
              <h3 className="discover-title">{category.title}</h3>
              <ul>
                {category.items.map((item, idx) => (
                  <li key={idx}>
                    <a href={item.link} className="discover-link">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="shop-all">
                <a href={category.shopLink} className="shop-all-btn">
                  <span className="arrow-icon">→</span>
                  <span className="shop-text">Shop All</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscoverMore;
