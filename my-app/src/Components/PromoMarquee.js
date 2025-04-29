import React from 'react';
import './PromoMarquee.css';

function PromoMarquee() {
  return (
    <div className="promo-section">
      <hr className="promo-line" />
      <div className="promo-marquee">
        <div className="promo-track">
          <span>🔥 Explore Fresh and Modern Home Decor Trends!</span>
          <button className="black-btn">New Arrivals</button>
          <span>⭐ New Arrivals</span>
          <span>✨ Uncover the Latest Styles in Home Decor!</span>
          <span>💡 Style Inspiration</span>
        </div>
      </div>
    </div>
  );
}

export default PromoMarquee;
