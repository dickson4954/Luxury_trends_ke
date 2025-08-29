import React from "react";
import "./TopOffers.css";
import offer1Video from "../Images/sleeping.mp4";
import offer2Video from "../Images/pantry.mp4";
import offer3Video from "../Images/sleeping.mp4";
import offer4Video from "../Images/shop.mp4";

// ...imports

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
            <video
              src={offer1Video}
              className="offer-img"
              autoPlay
              loop
              muted
              playsInline
            />
            <div className="offer-badge red-circle">
              Save up to<br />50%
            </div>
          </div>
        </div>

        <div className="offer-right">
          <div className="offer-top-row">
            <div className="offer-card small">
              <div className="offer-img-wrapper">
                <video
                  src={offer2Video}
                  className="offer-img"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
                <div className="offer-badge rectangle">Save<br />50%</div>
              </div>
            </div>

            <div className="offer-card small">
              <div className="offer-img-wrapper">
                <video
                  src={offer3Video}
                  className="offer-img"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
                <div className="offer-badge rectangle">Save<br />50%</div>
              </div>
            </div>
          </div>

          <div className="offer-card wide">
            <div className="offer-img-wrapper">
              <video
                src={offer4Video}
                className="offer-img"
                autoPlay
                loop
                muted
                playsInline
              />
              <div className="offer-badge rectangle">
                Offers on<br /><strong>Bed Linen</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopOffers;
