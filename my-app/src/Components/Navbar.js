import React, { useState } from 'react';
import './Navbar.css';
import { FaMicrophone, FaChevronDown } from 'react-icons/fa';
import Cart from '../Components/Cart';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../Images/ituriu.logo.jpg';

// Electrical category images
import lightingImg from '../Images/garden.jpg';
import wiringImg from '../Images/storage.jpg';
import toolsImg from '../Images/adaptor.webp';
import powerDistributionImg from '../Images/furnituree.jpg';
import circuitProtectionImg from '../Images/solar.webp';

// Shop By Area images
import residentialImg from '../Images/homee.jpg';
import commercialImg from '../Images/furniture.jpeg';
import industrialImg from '../Images/fridge.webp';
import outdoorImg from '../Images/garden1.webp';
import smartHomeImg from '../Images/homee.jpg';

// Services images
import electricalInstallationsImg from '../Images/ituriu.logo.jpg';
import maintenanceImg from '../Images/furnituree.jpg';
import energyAuditsImg from '../Images/kitchen.avif';
import emergencyServicesImg from '../Images/adaptor.webp';

// Sale & Offers images
import clearanceImg from '../Images/shop.jpg';
import discountDealImg from '../Images/garden.jpg';
import limitedOfferImg from '../Images/storage.jpg';
import flashSaleImg from '../Images/tier.jpeg';
import holidaySpecialImg from '../Images/travel.jpeg';

import LoginPage from '../Components/LoginPage';

// Map subcategories to actual category parameters that match Products.js
const subcategoryToCategoryMap = {
  // Products subcategories
  'Lighting Solutions': 'lighting',
  'Wiring & Cables': 'cables',
  'Circuit Protection': 'circuit-protection',
  'Power Distribution': 'power-distribution',
  'Tools & Equipment': 'tools',
  
  // Shop By Area subcategories
  'Residential Solutions': 'residential',
  'Commercial Installations': 'commercial', 
  'Industrial Systems': 'industrial',
  'Outdoor Lighting': 'outdoor-lights',
  'Smart Home Tech': 'smart-home',
  
  // Services subcategories 
  'Electrical Installations': 'installation-services',
  'Maintenance & Repairs': 'maintenance',
  'Energy Audits': 'energy-audits',
  'Safety Inspections': 'safety-inspections',
  'Emergency Services': 'emergency-services',
  
  // Deals subcategories
  'Clearance Items': 'clearance',
  'Bundle Offers': 'bundles',
  'Seasonal Promotions': 'seasonal',
  'Trade Discounts': 'trade',
  'New Product Launches': 'new',
};

const menuItems = [
  {
    title: 'Products',
    subcategories: [
      'Lighting Solutions',
      'Wiring & Cables', 
      'Circuit Protection',
      'Power Distribution',
      'Tools & Equipment'
    ],
    images: [lightingImg, wiringImg, toolsImg, powerDistributionImg, circuitProtectionImg],
  },
  {
    title: 'Shop By Area',
    subcategories: [
      'Residential Solutions',
      'Commercial Installations',
      'Industrial Systems',
      'Outdoor Lighting',
      'Smart Home Tech'
    ],
    images: [residentialImg, commercialImg, industrialImg, outdoorImg, smartHomeImg],
  },
  {
    title: 'Services',
    subcategories: [
      'Electrical Installations',
      'Maintenance & Repairs',
      'Energy Audits',
      'Safety Inspections',
      'Emergency Services'
    ],
    images: [electricalInstallationsImg, maintenanceImg, energyAuditsImg, emergencyServicesImg],
  },
  {
    title: 'Deals',
    subcategories: [
      'Clearance Items',
      'Bundle Offers',
      'Seasonal Promotions',
      'Trade Discounts',
      'New Product Launches'
    ],
    images: [clearanceImg, discountDealImg, limitedOfferImg, flashSaleImg, holidaySpecialImg],
  },
];

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [hoveredSubcategoryIndex, setHoveredSubcategoryIndex] = useState(0);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const navigate = useNavigate();

  const handleMouseEnter = (item) => {
    setActiveDropdown(item);
    setHoveredSubcategoryIndex(0);
    
    // Preload all images for this dropdown
    item.images.forEach((img, index) => {
      const image = new Image();
      image.src = img;
      image.onload = () => {
        setLoadedImages(prev => new Set([...prev, img]));
      };
    });
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setActiveDropdown(null);
      setHoveredSubcategoryIndex(0);
    }, 200);
  };

  const handleDropdownEnter = () => {
    clearTimeout();
    setActiveDropdown(activeDropdown);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
    setHoveredSubcategoryIndex(0);
  };

  const toggleLoginForm = () => setShowLoginForm((prev) => !prev);

  const handleSubcategoryClick = (subcategory) => {
    const categoryParam = subcategoryToCategoryMap[subcategory];
    if (categoryParam) {
      navigate(`/products?category=${categoryParam}`);
    } else {
      navigate('/products');
    }
    setActiveDropdown(null);
  };

  const handleImageClick = (e) => {
    e.stopPropagation();
    // Get the currently hovered subcategory
    const currentSubcategory = activeDropdown?.subcategories[hoveredSubcategoryIndex];
    if (currentSubcategory) {
      handleSubcategoryClick(currentSubcategory);
    }
  };

  const handleNavbarItemClick = (item) => {
    if (item.title === 'Products') {
      navigate('/products');
    }
  };

  const handleImageError = (e) => {
    console.log('Image failed to load:', e.target.src);
    // You can set a fallback image here if needed
    // e.target.src = '/fallback-image.jpg';
  };

  return (
    <>
      <header className="navbar">
        <div className="navbar-top">
          <Link to="/" className="navbar-logo">
            <img src={logo} alt="Ituriu Electricals Logo" />
            <div className="logo-text">Ituriu Electricals</div>
          </Link>

          <div className="navbar-search">
            <select aria-label="Search category">
              <option value="all">All Categories</option>
              <option value="lighting">Lighting</option>
              <option value="cables">Wiring & Cables</option>
              <option value="tools">Tools</option>
              <option value="outdoor-lights">Outdoor Lighting</option>
            </select>
            <input type="search" placeholder="Search electrical products..." aria-label="Search input" />
            <button className="mic-btn" aria-label="Voice search">
              <FaMicrophone />
            </button>
          </div>

          <div className="navbar-icons">
            <div
              className="icon-button"
              onClick={toggleLoginForm}
              role="button"
              aria-label="Login"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') toggleLoginForm();
              }}
            >
              <img
                src="https://i.pinimg.com/736x/66/fd/c9/66fdc942505a8d4e8adaef76845bf744.jpg"
                alt="Profile"
                className="profile-icon"
                style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
              />
            </div>

            <div
              className="icon-button"
              aria-label="Shopping Cart"
              onClick={() => setShowCart(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') setShowCart(true);
              }}
            >
              <img
                src="https://i.pinimg.com/736x/f0/c0/83/f0c083d2beb2fd171d2b46fb408dd52b.jpg"
                alt="Cart"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
              />
            </div>
            {showCart && <Cart isOpen={showCart} onClose={() => setShowCart(false)} />}
          </div>
        </div>

        <nav className="navbar-bottom">
          <ul>
            {menuItems.map((item) => (
              <li
                key={item.title}
                className="navbar-item"
                onMouseEnter={() => handleMouseEnter(item)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleNavbarItemClick(item)}
                tabIndex={0}
                onFocus={() => handleMouseEnter(item)}
                onBlur={handleMouseLeave}
                aria-haspopup="true"
                aria-expanded={activeDropdown?.title === item.title}
              >
                <span className="navbar-item-text">
                  {item.title} <FaChevronDown className="dropdown-icon" />
                </span>
                {activeDropdown?.title === item.title && (
                  <div 
                    className="dropdown-menu" 
                    onMouseEnter={handleDropdownEnter}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <div className="dropdown-content">
                      <div className="subcategory-list">
                        {item.subcategories.map((subcategory, idx) => (
                          <div
                            key={idx}
                            className={`subcategory-item ${idx === hoveredSubcategoryIndex ? 'active' : ''}`}
                            onMouseEnter={() => setHoveredSubcategoryIndex(idx)}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSubcategoryClick(subcategory);
                            }}
                            tabIndex={0}
                            role="button"
                            aria-selected={idx === hoveredSubcategoryIndex}
                            onFocus={() => setHoveredSubcategoryIndex(idx)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                handleSubcategoryClick(subcategory);
                              }
                            }}
                          >
                            {subcategory}
                          </div>
                        ))}
                      </div>

                      <div 
                        className="subcategory-image"
                        onClick={handleImageClick}
                        tabIndex={0}
                        role="button"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleImageClick(e);
                          }
                        }}
                      >
                        <img
                          src={item.images[hoveredSubcategoryIndex]}
                          alt={item.subcategories[hoveredSubcategoryIndex]}
                          onError={handleImageError}
                          // Remove lazy loading for instant display
                          loading="eager"
                        />
                        <div className="image-caption">
                          {item.subcategories[hoveredSubcategoryIndex]}
                          <span className="click-hint">Click image to view products</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}
            <li>
              <Link to="/contact" className="navbar-link">Contact Us</Link>
            </li>
          </ul>
        </nav>
      </header>

      {showLoginForm && (
        <div
          className="login-form-overlay"
          onClick={toggleLoginForm}
          role="dialog"
          aria-modal="true"
        >
          <div className="login-form-container" onClick={(e) => e.stopPropagation()}>
            <LoginPage />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;