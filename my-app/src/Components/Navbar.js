import React, { useState } from 'react';
import './Navbar.css';
import { FaUser, FaShoppingCart, FaMicrophone } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // <-- import Link for routing
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

// Filter out the Contact menu item to remove the dropdown
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

  const handleMouseEnter = (item) => {
    setActiveDropdown(item);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <header className="navbar">
      <div className="navbar-top">
        <div className="navbar-logo">
          <img src={logo} alt="Logo" />
          <p className="logo-text">Luxury Trends Ke</p>
        </div>

        <div className="navbar-search">
          <select>
            <option value="all">All</option>
          </select>
          <input type="text" placeholder="Search for articles" />
          <button className="mic-btn"><FaMicrophone /></button>
        </div>

        <div className="navbar-icons">
          <FaUser />
          <div className="cart-icon">
            <FaShoppingCart />
            <span className="cart-count">1</span>
          </div>
        </div>
      </div>

      <nav className="navbar-bottom">
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.title}
              className="categories-container"
              onMouseEnter={() => handleMouseEnter(item)}
              onMouseLeave={handleMouseLeave}
            >
              {item.title} ▾
              {activeDropdown?.title === item.title && (
                <div
                  className="dropdown-menu"
                  onMouseEnter={() => handleMouseEnter(item)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="categories-list">
                    {item.subcategories.map((subcategory, idx) => (
                      <div key={idx} className="category-item">
                        {subcategory}
                      </div>
                    ))}
                  </div>
                  <div className="category-images">
                    {item.images.map((img, index) => (
                      <img key={index} src={img} alt="Category" />
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
          {/* Add Contact as a simple link */}
          <li className="contact-link">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
