import React, { useState } from 'react';
import './TrendingAll.css';
import { useCart } from '../Components/CartContext';
import Cart from '../Components/Cart';

const trendingItems = [
  {
    id: 'p1',
    name: 'Cool Mist Humidifier | 2.2L | For Office, Indoor Plants',
    slug: 'cool-mist-humidifier',
    description: 'Portable humidifier perfect for indoor use with 2.2L capacity and quiet operation.',
    images: [require('../Images/tier.jpeg')],
    price: 3499,
    onSale: true,
  },
  {
    id: 'p2',
    name: 'Kid Kitchen Toddler Wooden Pretend Cooking Set',
    slug: 'wooden-kitchen-set',
    description: 'Wooden kitchen toy set for kids, great for imaginative play and learning.',
    images: [require('../Images/wall.jpg')],
    price: 3499,
    onSale: true,
  },
  {
    id: 'p3',
    name: 'Bathroom Wall Mounted Towel Rack with Hooks',
    slug: 'towel-rack-hooks',
    description: 'Stylish and space-saving bathroom rack with multiple hooks for convenience.',
    images: [require('../Images/cutlery.jpg')],
    price: 3499,
    onSale: true,
  },
  {
    id: 'p4',
    name: 'Glass Goblet, 370ML Snifter Glasses | Set of 6',
    slug: 'snifter-glasses-set',
    description: 'Elegant glass goblets for wine or cocktails, comes in a set of 6.',
    images: [require('../Images/layer.jpeg')],
    price: 1999,
    oldPrice: 2500,
    onSale: true,
  },
  {
    id: 'p5',
    name: 'Adjustable Tilting Laptop Folding Table Stand Desk',
    slug: 'folding-laptop-stand',
    description: 'Adjustable desk for laptops with foldable design, ideal for bed or couch use.',
    images: [require('../Images/flameless.jpeg')],
    price: 3499,
    onSale: true,
  },
];

const TrendingAll = () => {
  const { addToCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (item) => {
    // Add with quantity 1, uniquely identified by id
    addToCart({ ...item, quantity: 1 });
    setIsCartOpen(true);
  };

  return (
    <section className="trending-all-page">
      <header>
        <h1 className="page-title">Trending Products</h1>
      </header>

      <div className="products-grid">
        {trendingItems.map((item) => (
          <article
            className="product-card"
            key={item.id}
            tabIndex="0"
            aria-label={item.name}
          >
            {item.onSale && <span className="sale-badge">Sale</span>}

            <div className="image-wrapper">
              <img
                src={item.images[0]}
                alt={item.name}
                loading="lazy"
                className="product-image"
              />
            </div>

            <h3 className="product-title">{item.name}</h3>

            <p className="price">
              <span className="current-price">KSh{item.price.toLocaleString()}</span>
              {item.oldPrice && (
                <span className="old-price">KSh{item.oldPrice.toLocaleString()}</span>
              )}
            </p>

            <button
              className="btn-primary"
              onClick={() => handleAddToCart(item)}
              aria-label={`Add ${item.name} to cart`}
            >
              Add to Cart
            </button>
          </article>
        ))}
      </div>

      {isCartOpen && <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />}
    </section>
  );
};

export default TrendingAll;
