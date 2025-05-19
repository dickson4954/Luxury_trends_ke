import React, { useState } from 'react';
import './Navbar.css';
import { FaShoppingCart, FaMicrophone, FaChevronDown } from 'react-icons/fa';

import { Link } from 'react-router-dom';
import logo from '../Images/luxury_trends.jpg';
import LoginPage from '../Components/LoginPage';

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
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleMouseEnter = (item) => setActiveDropdown(item);
  const handleMouseLeave = () => setActiveDropdown(null);
  const toggleLoginForm = () => setShowLoginForm((prev) => !prev);

  return (
    <>
      <header className="navbar">
        <div className="navbar-top">
          <div className="navbar-logo">
            <img src={logo} alt="Luxury Trends Logo" />
            <div className="logo-text">Luxury Trends Ke</div>
          </div>

          <div className="navbar-search">
            <select aria-label="Search category">
              <option value="all">All</option>
            </select>
            <input type="search" placeholder="Search for collections" aria-label="Search input" />
            <button className="mic-btn" aria-label="Voice search">
              <FaMicrophone />
            </button>
          </div>

          <div className="navbar-icons">
            <div className="icon-button" onClick={toggleLoginForm} role="button" aria-label="Login">
  <img src="https://i.pinimg.com/736x/66/fd/c9/66fdc942505a8d4e8adaef76845bf744.jpg" alt="Profile" className="profile-icon" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
</div>
            <div className="icon-button" aria-label="Shopping Cart">
              <FaShoppingCart />
            </div>
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
              >
                {item.title} <FaChevronDown className="dropdown-icon" />
                {activeDropdown?.title === item.title && (
                  <div className="dropdown-menu">
                    <div className="dropdown-content">
                      {item.subcategories.map((subcategory, idx) => (
                        <div key={idx} className="dropdown-item">
                          {subcategory}
                        </div>
                      ))}
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
        <div className="login-form-overlay" onClick={toggleLoginForm} role="dialog" aria-modal="true">
          <div className="login-form-container" onClick={(e) => e.stopPropagation()}>
            <LoginPage />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
