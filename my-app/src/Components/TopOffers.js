import React from "react";
import "./TopOffers.css";
import offer1 from "../Images/fridge.webp";
import offer2 from "../Images/pantry.jpg";
import offer3 from "../Images/sleeping.png";
import offer4 from "../Images/shop.jpg";

const TopOffers = () => {
  return (
    <div className="top-offers-section">
      <div className="top-offers-header">
        <h2 className="top-offers-title">Top Offers</h2>
        <span className="view-all-link">View All</span>
      </div>
      <div className="top-offers-grid">
        <div className="offer-large">
          <div className="offer-img-wrapper">
            <img src={offer1} alt="Fridge" className="offer-img" />
            <div className="offer-badge red-circle">
              Save up to<br />50%
            </div>
          </div>
          <div className="offer-caption">
            <h4>Kitchen Essentials</h4>
            <p>Shop Your Favourite</p>
          </div>
        </div>

        <div className="offer-right">
          <div className="offer-top-row">
            <div className="offer-card small">
              <div className="offer-img-wrapper">
                <img src={offer2} alt="Pantry" className="offer-img" />
                <div className="offer-badge rectangle">Save<br />50%</div>
              </div>
              <div className="offer-caption">
                <h4>Pantry Offers</h4>
                <p>Shop Your Favourite</p>
              </div>
            </div>

            <div className="offer-card small">
              <div className="offer-img-wrapper">
                <img src={offer3} alt="Sleeping" className="offer-img" />
                <div className="offer-badge rectangle">Save<br />50%</div>
              </div>
              <div className="offer-caption">
                <h4>Sleeping Offers</h4>
                <p>Shop Your Favourite</p>
              </div>
            </div>
          </div>

          <div className="offer-card wide">
            <div className="offer-img-wrapper">
              <img src={offer4} alt="Bed Linen" className="offer-img" />
              <div className="offer-badge rectangle">
                Offers on<br /><strong>Bed Linen</strong>
              </div>
            </div>
            <div className="offer-caption">
              <h4>Bed Linen Offers</h4>
              <p>Shop Your Favourite</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopOffers;
