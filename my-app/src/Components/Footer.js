import React from 'react';
import './Footer.css'; // Make sure to create and style this file
import { FaFacebookF, FaInstagram, FaWhatsapp, FaTiktok, FaTwitter, FaPhoneAlt, FaMapMarkerAlt, FaGlobe } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* HomeLux Kenya Section */}
        <div className="footer-section">
          <h3>Luxury_trends_ke</h3>
          <p><strong>Luxury_trends_ke Kenya</strong></p>
          <p><FaMapMarkerAlt /> Nairobi CBD, Ronald Ngala Street, Interfina Building 2nd Floor.<br />Call/WhatsApp</p>
          <p><FaPhoneAlt /> 0725 260 473</p>
          <p><FaPhoneAlt /> 0102 605 919</p>
          <p><MdEmail /> sales@luxury_trend_ke.com</p>
          <p><FaGlobe /> www.luxury_trends_ke.com</p>
          <div className="footer-socials">
            <FaFacebookF />
            <FaInstagram />
            <FaWhatsapp />
            <FaTiktok />
            <FaTwitter />
          </div>
        </div>

        {/* Customer Service Section */}
        <div className="footer-section">
          <h4>Customer Service</h4>
          <ul>
            <li>Home</li>
            <li>Search</li>
            <li>Shipping Policy</li>
            <li>Refund Policy</li>
            <li>Contact us</li>
          </ul>
        </div>

        {/* Shipping Section */}
        <div className="footer-section">
          <h4>Shipping</h4>
          <p>Shipping from Abroad: Terms & Conditions</p>
        </div>

        {/* Newsletter Section */}
        <div className="footer-section">
          <h4>Newsletter</h4>
          <p>Sign up for exclusive offers, original stories, events and more.</p>
          <div className="newsletter-input">
            <input type="email" placeholder="Your email" />
            <button>&rarr;</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
