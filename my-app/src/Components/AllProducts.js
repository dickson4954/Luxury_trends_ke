import React, { useState, useEffect } from 'react';
import './AllProducts.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaTh, FaBars, FaShoppingBag } from 'react-icons/fa';
import productsData, { categoryInfo } from '../Components/Products';
import { useCart } from '../Components/CartContext';
import Cart from '../Components/Cart';

// Map navbar category parameters to actual product categories and create fallback info
const navbarCategoryInfo = {
  // Products subcategories
  'lighting': {
    title: 'Lighting Solutions',
    description: 'Discover our wide range of lighting solutions including LED lights, decorative lighting, and energy-efficient options for every space.',
    productCategories: ['table-lamps', 'decorative-lighting']
  },
  'cables': {
    title: 'Wiring & Cables',
    description: 'High-quality electrical cables and wiring solutions for safe and reliable power distribution in residential and commercial applications.',
    productCategories: ['cables', 'adaptors']
  },
  'circuit-protection': {
    title: 'Circuit Protection',
    description: 'Reliable circuit protection devices including breakers, fuses, and surge protectors for electrical safety.',
    productCategories: [] // Add relevant categories when you have these products
  },
  'power-distribution': {
    title: 'Power Distribution',
    description: 'Efficient power distribution units and electrical panels for organized and safe electricity management.',
    productCategories: [] // Add relevant categories when you have these products
  },
  'tools': {
    title: 'Tools & Equipment',
    description: 'Professional electrical tools and equipment for installations, maintenance, and repairs.',
    productCategories: [] // Add relevant categories when you have these products
  },
  
  // Shop By Area subcategories
  'residential': {
    title: 'Residential Solutions',
    description: 'Complete electrical solutions for homes including lighting, wiring, and safety devices for modern living.',
    productCategories: ['table-lamps', 'fans', 'cables']
  },
  'commercial': {
    title: 'Commercial Installations',
    description: 'Professional electrical systems for commercial spaces including offices and retail stores.',
    productCategories: [] // Add relevant categories when you have these products
  },
  'industrial': {
    title: 'Industrial Systems',
    description: 'Robust electrical systems and components designed for industrial applications and heavy-duty use.',
    productCategories: [] // Add relevant categories when you have these products
  },
  'outdoor-lights': {
    title: 'Outdoor Lighting',
    description: 'Weather-resistant outdoor lighting solutions for gardens, pathways, security, and architectural illumination.',
    productCategories: ['outdoor-lights', 'solar-lights']
  },
  'smart-home': {
    title: 'Smart Home Tech',
    description: 'Advanced smart home electrical systems including automated lighting and connected devices.',
    productCategories: [] // Add relevant categories when you have these products
  },
  
  // Services subcategories
  'installation-services': {
    title: 'Electrical Installations',
    description: 'Professional electrical installation services by certified electricians for residential and commercial projects.',
    productCategories: [] // Services might not have products
  },
  'maintenance': {
    title: 'Maintenance & Repairs',
    description: 'Comprehensive electrical maintenance and repair services to keep your systems running safely.',
    productCategories: [] // Services might not have products
  },
  'energy-audits': {
    title: 'Energy Audits',
    description: 'Professional energy efficiency audits to help you save on electricity costs and improve sustainability.',
    productCategories: [] // Services might not have products
  },
  'safety-inspections': {
    title: 'Safety Inspections',
    description: 'Thorough electrical safety inspections to ensure your systems meet all safety standards and regulations.',
    productCategories: [] // Services might not have products
  },
  'emergency-services': {
    title: 'Emergency Services',
    description: '24/7 emergency electrical services for urgent repairs and critical electrical issues.',
    productCategories: [] // Services might not have products
  },
  
  // Deals subcategories
  'clearance': {
    title: 'Clearance Items',
    description: 'Great deals on clearance electrical products. Limited stock available at discounted prices.',
    productCategories: [] // Add relevant categories when you have deals
  },
  'bundles': {
    title: 'Bundle Offers',
    description: 'Special bundle offers and package deals on electrical products for extra savings.',
    productCategories: [] // Add relevant categories when you have deals
  },
  'seasonal': {
    title: 'Seasonal Promotions',
    description: 'Seasonal promotions and special offers on electrical products throughout the year.',
    productCategories: [] // Add relevant categories when you have deals
  },
  'trade': {
    title: 'Trade Discounts',
    description: 'Exclusive trade discounts for electricians, contractors, and industry professionals.',
    productCategories: [] // Add relevant categories when you have deals
  },
  'new': {
    title: 'New Product Launches',
    description: 'Check out our latest electrical products and innovative new arrivals in the market.',
    productCategories: [] // Add relevant categories when you have new products
  },
};

export default function AllProducts() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  
  const [viewMode, setViewMode] = useState('grid');
  const [products, setProducts] = useState(productsData);
  const [filteredProducts, setFilteredProducts] = useState(productsData);
  const [sortOption, setSortOption] = useState('featured');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { addToCart } = useCart();

  // Filter products based on category
  useEffect(() => {
    let filtered = productsData;
    
    if (category) {
      const navbarCategory = navbarCategoryInfo[category];
      if (navbarCategory && navbarCategory.productCategories.length > 0) {
        // Filter by multiple product categories if specified
        filtered = productsData.filter(product => 
          navbarCategory.productCategories.includes(product.category)
        );
      } else {
        // Fallback: show all products if no specific mapping
        filtered = productsData;
      }
    }
    
    setFilteredProducts(filtered);
    setProducts(filtered);
  }, [category]);

  // Sorting logic
  useEffect(() => {
    let sorted = [...filteredProducts];
    switch (sortOption) {
      case 'featured':
      case 'bestselling':
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
  }, [sortOption, filteredProducts]);

  const handleAddToCart = (product) => {
    addToCart({ ...product, quantity: 1 });
    setIsCartOpen(true);
  };

  // Get current category data
  const currentCategory = category ? navbarCategoryInfo[category] : null;

  return (
    <div className="all-products-page">
      {/* Category Header - Only show when a category is selected */}
      {currentCategory && (
        <div className="category-header">
          <div className="category-breadcrumb">
            <button onClick={() => navigate('/products')} className="back-to-all">
              ← Back to All Products
            </button>
          </div>
          <h1 className="category-title">
            {currentCategory.title} <span className="product-count">({filteredProducts.length} products)</span>
          </h1>
          <p className="category-description">
            {currentCategory.description}
          </p>
        </div>
      )}

      {/* Regular Header - Show when no category is selected */}
      {!category && (
        <h2 className="page-title">
          All Electrical Products <span>({products.length} products)</span>
        </h2>
      )}

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

      {products.length === 0 && (
        <div className="no-products">
          <p>No products found in this category.</p>
          <button 
            onClick={() => navigate('/products')} 
            className="btn view-all-products"
          >
            View All Products
          </button>
        </div>
      )}

      {isCartOpen && <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />}
    </div>
  );
}