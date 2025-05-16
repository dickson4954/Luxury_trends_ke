import React, { useState } from 'react';
import './ContactPage.css';
import bgImage from '../Images/luxury_trends.jpg';
import Footer from '../Components/Footer'; // Your footer import

const ContactPage = () => {
  // Form state for contact form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState('');

  // Form state for newsletter signup
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterMsg, setNewsletterMsg] = useState('');

  // Validation for contact form
  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.subject.trim()) errors.subject = 'Subject is required';
    if (!formData.message.trim()) errors.message = 'Message cannot be empty';
    return errors;
  };

  // Contact form handlers
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSuccessMsg('Thank you for contacting us! We will get back to you shortly.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    }
  };

  // Newsletter signup handler
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) {
      setNewsletterMsg('Please enter your email');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(newsletterEmail)) {
      setNewsletterMsg('Please enter a valid email');
      return;
    }
    setNewsletterMsg('Thank you for signing up!');
    setNewsletterEmail('');
  };

  return (
    <div className="contact-page">

      {/* Hero Section */}
      <div
        className="contact-hero"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '100px 20px',
          textAlign: 'center',
          color: '#fff',
          marginTop: '80px' // adjust if navbar height changes
        }}
      >
        <h1>Contact Luxury Trends Ke</h1>
        <p>We’re here to assist you with anything you need. Reach out and we’ll respond promptly.</p>
      </div>

      {/* Contact form and info */}
      <div className="contact-container">
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <h2>Send Us a Message</h2>
          {successMsg && <p className="success-message">{successMsg}</p>}
          <div className="input-group">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className={errors.name ? 'error' : ''}
              autoComplete="off"
            />
            {errors.name && <small>{errors.name}</small>}
          </div>

          <div className="input-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className={errors.email ? 'error' : ''}
              autoComplete="off"
            />
            {errors.email && <small>{errors.email}</small>}
          </div>

          <div className="input-group">
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className={errors.subject ? 'error' : ''}
              autoComplete="off"
            />
            {errors.subject && <small>{errors.subject}</small>}
          </div>

          <div className="input-group">
            <textarea
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              className={errors.message ? 'error' : ''}
            />
            {errors.message && <small>{errors.message}</small>}
          </div>

          <button type="submit" className="btn-submit">Send Message</button>
        </form>
      </div>

      {/* Newsletter signup section */}
      <section className="newsletter-section">
        <h3>Sign up to our Newsletter</h3>
        <p>Be the first to know about new collections and exclusive offers.</p>
        <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
          <input
            type="email"
            placeholder="Your email"
            value={newsletterEmail}
            onChange={(e) => setNewsletterEmail(e.target.value)}
          />
          <button type="submit" aria-label="Subscribe">
            <span className="arrow">→</span>
          </button>
        </form>
        {newsletterMsg && <p className="newsletter-msg">{newsletterMsg}</p>}
      </section>

      {/* Info bar section */}
      <section className="info-bar">
        <div className="info-item">
          <span className="icon">💬</span>
          <div>
            <strong>For Complaints Click Here</strong>
            <p>Resolve Issues Easily: Access our complaint section with a click.</p>
          </div>
        </div>
        <div className="info-item">
          <span className="icon">📦</span>
          <div>
            <strong>Check your order status</strong>
            <p>Updates & tracking</p>
          </div>
        </div>
        <div className="info-item">
          <span className="icon">↩️</span>
          <div>
            <strong>Returns & exchanges</strong>
            <p>All you need to know</p>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <div className="map-container">
        <iframe
          title="Luxury Trends Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1994.5846723685293!2d36.82194621613214!3d-1.2920658997402332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10a4b0f6f7e3%3A0x3ee4c3b625ebfc3e!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2sus!4v1627993768967!5m2!1sen!2sus"
          width="100%"
          height="350"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactPage;
