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
         
        </div>
        
    
        </div>
      </div>
  
  );
};

export default HeroSection;
