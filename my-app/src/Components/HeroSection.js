import React from "react";
import "./HeroSection.css";
import backgroundImg from "../Images/layer2.jpg";

const HeroSection = () => {
  return (
    <div
      className="hero-section"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content-wrapper">
        <div className="hero-left">
          <h5 className="hero-subtitle">WHERE INNOVATION MEETS POWER</h5>
          <h1 className="hero-title">Electrifying Solutions for a Brighter Future</h1>
          <p className="hero-text">Cutting-edge electrical systems for modern living</p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
