import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { FaUser, FaShoppingCart, FaMicrophone } from 'react-icons/fa';
import logo from '../Images/luxury_trends.jpg';

// Category images
import homeDecorImg from '../Images/appliances.jpeg';
import kitchenDiningImg from '../Images/Bedroom.jpeg';
import bedBathImg from '../Images/bedrooms.jpg';
import furnitureImg from '../Images/cutlery.jpg';
import storageImg from '../Images/flameless.jpeg';

// Shop By Room images
import livingRoomImg from '../Images/cutlery.jpg';
import bedroomImg from '../Images/home.webp';
import kitchenRoomImg from '../Images/furnituree.jpg';
import bathroomImg from '../Images/furniture.jpeg';
import outdoorImg from '../Images/fridge.webp';

// Gifts images
import birthdayGiftImg from '../Images/kitchen.avif';
import weddingGiftImg from '../Images/layer.jpeg';
import housewarmingGiftImg from '../Images/pantry.jpg';
import anniversaryGiftImg from '../Images/piration.jpg';
import corporateGiftImg from '../Images/homee.jpg';

// Sale & Offers images
import clearanceImg from '../Images/shop.jpg';
import discountDealImg from '../Images/garden.jpg';
import limitedOfferImg from '../Images/storage.jpg';
import flashSaleImg from '../Images/tier.jpeg';
import holidaySpecialImg from '../Images/travel.jpeg';

// Contact images
import customerSupportImg from '../Images/bedrooms.jpg';
import returnPolicyImg from '../Images/Bedroom.jpeg';
import storeLocationImg from '../Images/cutlery.jpg';
import feedbackImg from '../Images/appliances.jpeg';
import faqsImg from '../Images/flameless.jpeg';

// Function to shuffle an array
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Define menu items
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
  {
    title: 'Contact',
    subcategories: ['Customer Support', 'Return Policy', 'Store Locations', 'Feedback', 'FAQs'],
    images: [customerSupportImg, returnPolicyImg, storeLocationImg, feedbackImg, faqsImg],
  },
];

const Navbar = () => {
  const [placeholder, setPlaceholder] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const words = ['collections', 'products'];
  const typingSpeed = 150;
  const deletingSpeed = 100;
  const pauseTime = 1000;

  useEffect(() => {
    const typeEffect = setInterval(() => {
      const currentWord = words[currentWordIndex];
      if (!isDeleting) {
        setPlaceholder((prev) => prev + currentWord[textIndex]);
        if (textIndex === currentWord.length - 1) {
          setTimeout(() => setIsDeleting(true), pauseTime);
        } else {
          setTextIndex((prev) => prev + 1);
        }
      } else {
        setPlaceholder((prev) => prev.slice(0, -1));
        if (placeholder.length === 0) {
          setIsDeleting(false);
          setTextIndex(0);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearInterval(typeEffect);
  }, [placeholder, textIndex, isDeleting, currentWordIndex]);

  return (
    <header className="navbar">
      <div className="navbar-top">
        <div className="navbar-logo">
          <img src={logo} alt="Logo" />
          <p className="logo-text">Luxury_trends_ke</p>
        </div>

        <div className="navbar-search">
          <select>
            <option value="all">All</option>
          </select>
          <input type="text" placeholder={`Search for ${placeholder}`} />
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
              onMouseEnter={() => { setShowDropdown(true); setHoveredItem(item); }}
              onMouseLeave={() => { setShowDropdown(false); setHoveredItem(null); }}
            >
              {item.title} ▾
              {showDropdown && hoveredItem?.title === item.title && (
                <div className="dropdown-menu">
                  <div className="categories-list">
                    {item.subcategories.map((subcategory, idx) => (
                      <div key={idx} className="category-item">
                        {subcategory}
                      </div>
                    ))}
                  </div>
                  <div className="category-images">
                    {shuffleArray(item.images).map((img, index) => (
                      <img key={index} src={img} alt="Category" />
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
