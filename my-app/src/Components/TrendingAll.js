import React from 'react';
import './TrendingAll.css';

const trendingItems = [
  {
    title: 'Cool Mist Humidifier | 2.2L | For Office, Indoor Plants...',
    image: require('../Images/tier.jpeg'),
    price: 'KSh3,499.00',
    onSale: true,
  },
  {
    title: 'Kid Kitchen Toddler Wooden Pretend Cooking Set...',
    image: require('../Images/wall.jpg'),
    price: 'KSh3,499.00',
    onSale: true,
  },
  {
    title: 'Bathroom wall mounted towel rack accessory with hooks',
    image: require('../Images/cutlery.jpg'),
    price: 'KSh3,499.00',
    onSale: true,
  },
  {
    title: 'Glass goblet, 370 ML Snifter Glasses | Set of 6',
    image: require('../Images/layer.jpeg'),
    price: 'KSh1,999.00',
    oldPrice: 'KSh2,500.00',
    onSale: true,
  },
  {
    title: 'Adjustable Tilting Laptop Folding Table Stand Desk...',
    image: require('../Images/flameless.jpeg'),
    price: 'KSh3,499.00',
    onSale: true,
  },
];

const TrendingAll = () => {
  return (
    <section className="trending-all-page">
      <header>
        <h1 className="page-title">Trending Products</h1>
      </header>

      <div className="products-grid">
        {trendingItems.map((item, idx) => (
          <article className="product-card" key={idx} tabIndex="0" aria-label={item.title}>
            {item.onSale && <span className="sale-badge">Sale</span>}

            <div className="image-wrapper">
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="product-image"
              />
            </div>

            <h3 className="product-title">{item.title}</h3>

            <p className="price">
              <span className="current-price">{item.price}</span>
              {item.oldPrice && <span className="old-price">{item.oldPrice}</span>}
            </p>

            {/* Placeholder for add to cart or details button */}
            <button className="btn-primary" aria-label={`Add ${item.title} to cart`}>
              Add to Cart
            </button>
          </article>
        ))}
      </div>
    </section>
  );
};

export default TrendingAll;
