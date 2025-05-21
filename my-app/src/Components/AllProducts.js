import React, { useState, useEffect } from 'react';
import './AllProducts.css';
import { useNavigate } from 'react-router-dom';
import { FaTh, FaBars, FaShoppingBag } from 'react-icons/fa';
import productsData from '../Components/Products';
import { useCart } from '../Components/CartContext';
import Cart from '../Components/Cart'; // import your Cart component here

export default function AllProducts() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid');
  const [products, setProducts] = useState(productsData);
  const [sortOption, setSortOption] = useState('featured');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { addToCart } = useCart();

  useEffect(() => {
    let sorted = [...productsData];
    switch (sortOption) {
      case 'featured':
      case 'bestselling':
        // You can customize sorting for these if needed
        break;
      case 'az':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'za':
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'lowtohigh':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'hightolow':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'oldtonew':
        sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'newtoold':
        sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      default:
        break;
    }
    setProducts(sorted);
  }, [sortOption]);

  const handleAddToCart = (product) => {
    addToCart({ ...product, quantity: 1 });
    setIsCartOpen(true);  // Open the cart popup immediately
  };

  return (
    <div className="all-products-page">
      <h2 className="page-title">
        Products <span>({products.length} products)</span>
      </h2>

      <div className="top-bar">
        <div className="sort-bar">
          <label htmlFor="sort">Sort by:</label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="featured">Featured</option>
            <option value="bestselling">Best selling</option>
            <option value="az">Alphabetically, A–Z</option>
            <option value="za">Alphabetically, Z–A</option>
            <option value="lowtohigh">Price, low to high</option>
            <option value="hightolow">Price, high to low</option>
            <option value="oldtonew">Date, old to new</option>
            <option value="newtoold">Date, new to old</option>
          </select>
        </div>
        <div className="view-toggle">
          <span>View as</span>
          <button
            className={viewMode === 'list' ? 'active' : ''}
            onClick={() => setViewMode('list')}
            aria-label="List view"
          >
            <FaBars />
          </button>
          <button
            className={viewMode === 'grid' ? 'active' : ''}
            onClick={() => setViewMode('grid')}
            aria-label="Grid view"
          >
            <FaTh />
          </button>
        </div>
      </div>

      <div className={`products-grid ${viewMode}`}>
        {products.map((p) => (
          <div key={p.id} className="product-card">
            <div className="product-image-wrapper">
              <img src={p.images[0]} alt={p.name} className="product-image" />
              {viewMode === 'grid' && (
                <div className="hover-buttons">
                  <button
                    className="btn add-to-cart"
                    onClick={() => handleAddToCart(p)}
                    aria-label={`Add ${p.name} to cart`}
                  >
                    Add to cart
                  </button>
                  <button
                    className="btn order-now"
                    onClick={() => navigate(`/product/${p.slug}`)}
                    aria-label={`Order ${p.name} now`}
                  >
                    <FaShoppingBag /> Order Now
                  </button>
                </div>
              )}
            </div>
            <div className="product-info">
              <h3>{p.name}</h3>
              <p className="price">KSh{p.price.toLocaleString()}</p>
            </div>
            <p className={`product-description ${viewMode}`}>
              {viewMode === 'grid'
                ? p.description.slice(0, 60) + '…'
                : p.description}
            </p>
            {viewMode === 'list' ? (
              <div className="buttons">
                <button
                  className="btn add-to-cart"
                  onClick={() => handleAddToCart(p)}
                  aria-label={`Add ${p.name} to cart`}
                >
                  Add to cart
                </button>
                <button
                  className="btn view-details"
                  onClick={() => navigate(`/product/${p.slug}`)}
                  aria-label={`View details of ${p.name}`}
                >
                  View details
                </button>
                <button
                  className="btn order-now"
                  onClick={() => navigate(`/product/${p.slug}`)}
                  aria-label={`Order ${p.name} now`}
                >
                  <FaShoppingBag /> Order Now
                </button>
              </div>
            ) : (
              <p
                className="view-product"
                onClick={() => navigate(`/product/${p.slug}`)}
                tabIndex={0}
                role="button"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') navigate(`/product/${p.slug}`);
                }}
                aria-label={`View product ${p.name}`}
              >
                View product <span className="arrow">→</span>
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Render Cart popup here */}
      {isCartOpen && <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />}
    </div>
  );
}
