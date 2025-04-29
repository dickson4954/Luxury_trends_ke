import React from 'react';
import './DiscoverMore.css';

import homeAccessoriesImg from '../Images/homee.jpg';
import bedroomImg from '../Images/Bedroom.jpeg';
import kidsImg from '../Images/storage.jpg';
import kitchenImg from '../Images/home.webp';

const discoverCategories = [
  {
    title: 'Home Accessories',
    image: homeAccessoriesImg,
    items: [
      { name: 'Mirrors', link: '#' },
      { name: 'Wall Clocks', link: '#' },
      { name: 'Vases', link: '#' },
    ],
    shopLink: '#',
  },
  {
    title: 'Bedroom',
    image: bedroomImg,
    items: [
      { name: 'Bedsheets', link: '#' },
      { name: 'Duvet Covers', link: '#' },
      { name: 'Closet Organizers', link: '#' },
    ],
    shopLink: '#',
  },
  {
    title: 'Kids',
    image: kidsImg,
    items: [
      { name: 'Toys & Games', link: '#' },
      { name: 'Kids Tablets', link: '#' },
      { name: 'Kids Games', link: '#' },
    ],
    shopLink: '#',
  },
  {
    title: 'Kitchen',
    image: kitchenImg,
    items: [
      { name: 'Cookware', link: '#' },
      { name: 'Food Storage', link: '#' },
      { name: 'Kitchen Essentials', link: '#' },
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
            <img src={category.image} alt={category.title} className="discover-image" />
            <div className="discover-content">
              <h3 className="discover-title">{category.title}</h3>
              <ul>
                {category.items.map((item, idx) => (
                  <li key={idx}>
                    <a href={item.link} className="discover-link">{item.name}</a>
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
