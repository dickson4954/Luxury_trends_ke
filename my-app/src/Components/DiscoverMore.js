import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import './DiscoverMore.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import tableLampImg from '../Images/table-lamp.webp';
import switchesImg from '../Images/switches.webp';
import outdoorLightsImg from '../Images/out-door.webp';
import bathroomLightsImg from '../Images/bathroom-lights.webp';
import cablesImg from '../Images/cables.webp';
import fansImg from '../Images/fans.webp';
import decorativeLightingImg from '../Images/chandalier.webp';
import solarLightsImg from '../Images/solar.webp';

const discoverCategories = [
  {
    title: 'Table Lamps',
    image: tableLampImg,
    items: [
      { name: 'LED Desk Lamp', category: 'table-lamps' },
      { name: 'Rechargeable Table Light', category: 'table-lamps' },
      { name: 'Modern Table Lamps', category: 'table-lamps' },
      { name: 'Reading Lamps', category: 'table-lamps' },
    ],
    shopLink: '/products?category=table-lamps',
  },
  {
    title: 'Switches',
    image: switchesImg,
    items: [
      { name: 'Smart Touch Switches', category: 'switches' },
      { name: 'Classic Wall Switches', category: 'switches' },
      { name: 'Dimmer Switches', category: 'switches' },
      { name: 'Gang Switches', category: 'switches' },
    ],
    shopLink: '/products?category=switches',
  },
  {
    title: 'Outdoor Lights',
    image: outdoorLightsImg,
    items: [
      { name: 'Flood Lights', category: 'outdoor-lights' },
      { name: 'Solar Garden Lamps', category: 'outdoor-lights' },
      { name: 'LED Gate Lights', category: 'outdoor-lights' },
      { name: 'Pathway Lights', category: 'outdoor-lights' },
    ],
    shopLink: '/products?category=outdoor-lights',
  },
  {
    title: 'Bathroom Lights',
    image: bathroomLightsImg,
    items: [
      { name: 'Vanity Mirror Lights', category: 'bathroom-lights' },
      { name: 'Waterproof Ceiling Lights', category: 'bathroom-lights' },
      { name: 'Shower Lights', category: 'bathroom-lights' },
      { name: 'Bathroom Wall Lights', category: 'bathroom-lights' },
    ],
    shopLink: '/products?category=bathroom-lights',
  },
  {
    title: 'Power Cables',
    image: cablesImg,
    items: [
      { name: 'Power Cables', category: 'cables' },
      { name: 'Extension Cords', category: 'adaptors' },
      { name: 'Electrical Wires', category: 'cables' },
      { name: 'Plug Adapters', category: 'adaptors' },
    ],
    shopLink: '/products?category=cables',
  },
  {
    title: 'Ceiling Fans',
    image: fansImg,
    items: [
      { name: 'Ceiling Fans', category: 'fans' },
      { name: 'Energy Efficient Fans', category: 'fans' },
      { name: 'Remote Control Fans', category: 'fans' },
      { name: 'Industrial Fans', category: 'fans' },
    ],
    shopLink: '/products?category=fans',
  },
  {
    title: 'Decorative Lighting',
    image: decorativeLightingImg,
    items: [
      { name: 'Chandelier Lights', category: 'decorative-lighting' },
      { name: 'Pendant Lights', category: 'decorative-lighting' },
      { name: 'Wall Sconces', category: 'decorative-lighting' },
      { name: 'String Lights', category: 'decorative-lighting' },
    ],
    shopLink: '/products?category=decorative-lighting',
  },
  {
    title: 'Solar Lights',
    image: solarLightsImg,
    items: [
      { name: 'Solar Powered Lights', category: 'solar-lights' },
      { name: 'Solar Garden Lights', category: 'solar-lights' },
      { name: 'Solar Security Lights', category: 'solar-lights' },
      { name: 'Solar Street Lights', category: 'solar-lights' },
    ],
    shopLink: '/products?category=solar-lights',
  },
];

const DiscoverMore = () => {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="discover-more">
      <div className="discover-header">
        <h2 className="discover-heading">Discover More Electrical Products</h2>
        <div className="scroll-controls">
          <button className="scroll-btn" onClick={scrollLeft} aria-label="Scroll left">
            <FaChevronLeft />
          </button>
          <button className="scroll-btn" onClick={scrollRight} aria-label="Scroll right">
            <FaChevronRight />
          </button>
        </div>
      </div>
      
      <div className="discover-container">
        <div className="discover-scroll" ref={scrollContainerRef}>
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
                      <Link 
                        to={`/products?category=${item.category}`} 
                        className="discover-link"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="shop-all">
                  <Link to={category.shopLink} className="shop-all-btn">
                    <span className="arrow-icon">→</span>
                    <span className="shop-text">Shop All {category.title}</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscoverMore;