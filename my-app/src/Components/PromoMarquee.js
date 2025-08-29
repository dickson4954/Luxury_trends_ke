import React from 'react';
import './PromoMarquee.css';

function PromoMarquee() {
  return (
    <div className="promo-section">
      <hr className="promo-line" />
      <div className="promo-marquee">
        <div className="promo-track">
          <span>⚡ Power Up with the Latest Electrical Innovations!</span>
          <button className="black-btn">Shop Now</button>
          <span>🔌 Energy-Efficient Solutions</span>
          <span>💡 Bright Ideas for Every Space</span>
          <span>🛠️ Reliable Electrical Tools & Accessories</span>
        </div>
      </div>
    </div>
  );
}

export default PromoMarquee;
