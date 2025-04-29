import React from "react";
import "./HeroSection.css";
import backgroundImg from "../Images/landing.jpg"; 

const HeroSection = () => {
  return (
    <div
      className="hero-section"
      style={{ backgroundImage: `url(${backgroundImg})` }} >
      <div className="hero-overlay"></div>
      <div className="hero-content-wrapper">
        <div className="hero-left">
          <h5 className="hero-subtitle">WHERE SOPHISTICATION MEETS COMFORT</h5>
          <h1 className="hero-title">Inspired by Elegance, designed for you</h1>
          <p className="hero-text">Curated spaces for unforgettable moments</p>
          <div className="hero-buttons">
          <button className="btn">Shop Decor</button>
          <button className="btn">Shop Kitchen</button>
        </div>
        </div>
        <div className="hero-right">
          <div className="hero-form">
            <h3>Shop By Room</h3>
            <select>
              <option>Choose Room</option>
              <option>Living Room</option>
              <option>Bedroom</option>
            </select>
            <select>
              <option>Choose Category</option>
              <option>Furniture</option>
              <option>Decor</option>
            </select>
            <button className="btn search-btn">Search</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
