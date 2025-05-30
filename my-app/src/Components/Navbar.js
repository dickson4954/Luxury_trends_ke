import React, { useState } from 'react';
import './Navbar.css';
import { FaMicrophone, FaChevronDown } from 'react-icons/fa';
import Cart from '../Components/Cart';

import { Link } from 'react-router-dom';
import logo from '../Images/luxury_trends.jpg';

// Category Images
import homeDecorImg from '../Images/appliances.jpeg';
import kitchenDiningImg from '../Images/Bedroom.jpeg';
import bedBathImg from '../Images/bedrooms.jpg';
import furnitureImg from '../Images/cutlery.jpg';
import storageImg from '../Images/flameless.jpeg';

// Shop By Room Images
import livingRoomImg from '../Images/cutlery.jpg';
import bedroomImg from '../Images/home.webp';
import kitchenRoomImg from '../Images/furnituree.jpg';
import bathroomImg from '../Images/furniture.jpeg';
import outdoorImg from '../Images/fridge.webp';

// Gifts Images
import birthdayGiftImg from '../Images/kitchen.avif';
import weddingGiftImg from '../Images/layer.jpeg';
import housewarmingGiftImg from '../Images/pantry.jpg';
import anniversaryGiftImg from '../Images/piration.jpg';
import corporateGiftImg from '../Images/homee.jpg';

// Sale & Offers Images
import clearanceImg from '../Images/shop.jpg';
import discountDealImg from '../Images/garden.jpg';
import limitedOfferImg from '../Images/storage.jpg';
import flashSaleImg from '../Images/tier.jpeg';
import holidaySpecialImg from '../Images/travel.jpeg';

import LoginPage from '../Components/LoginPage';

const menuItems = [
  {
    title: 'Categories',
    subcategories: ['Home Decor', 'Kitchen & Dining', 'Bed & Bath', 'Furniture', 'Storage & Organization'],
    images: [homeDecorImg, kitchenDiningImg, bedBathImg, furnitureImg, storageImg],
  },
  {
    title: 'Shop By Room',
    subcategories: ['Living Room', 'Bedroom', 'Kitchen', 'Bathroom', 'Outdoor'],
    images: [livingRoomImg, bedroomImg, kitchenRoomImg, bathroomImg, outdoorImg],
  },
  {
    title: 'Gifts',
    subcategories: ['Birthday Gifts', 'Wedding Gifts', 'Housewarming Gifts', 'Anniversary Gifts', 'Corporate Gifts'],
    images: [birthdayGiftImg, weddingGiftImg, housewarmingGiftImg, anniversaryGiftImg, corporateGiftImg],
  },
  {
    title: 'Sale & Offers',
    subcategories: ['Clearance', 'Discount Deals', 'Limited Offers', 'Flash Sales', 'Holiday Specials'],
    images: [clearanceImg, discountDealImg, limitedOfferImg, flashSaleImg, holidaySpecialImg],
  },
];

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [hoveredSubcategoryIndex, setHoveredSubcategoryIndex] = useState(0);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const handleMouseEnter = (item) => {
    setActiveDropdown(item);
    setHoveredSubcategoryIndex(0);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
    setHoveredSubcategoryIndex(0);
  };

  const toggleLoginForm = () => setShowLoginForm((prev) => !prev);

  return (
    <>
      <header className="navbar">
        <div className="navbar-top">
         <Link to="/" className="navbar-logo">
  <img src={logo} alt="Luxury Trends Logo" />
  <div className="logo-text">Luxury Trends Ke</div>
</Link>

          <div className="navbar-search">
            <select aria-label="Search category">
              <option value="all">All</option>
            </select>
            <input type="search" placeholder="Search for collections" aria-label="Search input" />
           
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
                tabIndex={0}
                onFocus={() => handleMouseEnter(item)}
                onBlur={handleMouseLeave}
                aria-haspopup="true"
                aria-expanded={activeDropdown?.title === item.title}
              >
                {item.title} <FaChevronDown className="dropdown-icon" />
                {activeDropdown?.title === item.title && (
                  <div className="dropdown-menu" onMouseLeave={handleMouseLeave}>
                    <div className="dropdown-content">
                      <div className="subcategory-list">
                        {item.subcategories.map((subcategory, idx) => (
                          <div
                            key={idx}
                            className={`subcategory-item ${idx === hoveredSubcategoryIndex ? 'active' : ''}`}
                            onMouseEnter={() => setHoveredSubcategoryIndex(idx)}
                            tabIndex={0}
                            role="button"
                            aria-selected={idx === hoveredSubcategoryIndex}
                            onFocus={() => setHoveredSubcategoryIndex(idx)}
                          >
                            {subcategory}
                          </div>
                        ))}
                      </div>

                      <div className="subcategory-image">
                        <img
                          src={item.images[hoveredSubcategoryIndex]}
                          alt={item.subcategories[hoveredSubcategoryIndex]}
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}
            <li>
              <Link to="/contact">Contact</Link>
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
