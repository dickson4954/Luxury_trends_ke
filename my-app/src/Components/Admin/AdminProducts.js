import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminProducts.css';
import { 
  FaPlus, FaEdit, FaTrash, FaSearch, 
  FaSpinner, FaExclamationTriangle,
  FaBoxOpen, FaTag, FaDollarSign, FaCube,
  FaChevronLeft, FaChevronRight, FaCloudUploadAlt,
  FaRegImages, FaTimes, FaArrowLeft  // Added FaArrowLeft
} from 'react-icons/fa';

const AdminProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/admin/products', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/categories/');
      const data = await response.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleDelete = async () => {
    if (!productToDelete) return;
    
    setDeleteLoading(true);
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:5000/api/admin/products/${productToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setProducts(products.filter(p => p.id !== productToDelete.id));
      setShowDeleteModal(false);
      setProductToDelete(null);
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    } finally {
      setDeleteLoading(false);
    }
  };

  // Filter products by category and search term
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.sku?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category_id === parseInt(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get stock status class
  const getStockStatusClass = (quantity) => {
    if (quantity === 0) return 'out-of-stock';
    if (quantity < 10) return 'low-stock';
    return 'in-stock';
  };

  const getStockStatusText = (quantity) => {
    if (quantity === 0) return 'Out of Stock';
    if (quantity < 10) return 'Low Stock';
    return 'In Stock';
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner-container">
          <FaSpinner className="spinner" />
          <p>Loading your products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-products">
      {/* Back Button and Header */}
      <div className="admin-header-with-back">
        <div className="back-button-container">
          <button 
            className="back-to-dashboard-btn"
            onClick={() => navigate('/admin-dashboard')}
          >
            <FaArrowLeft /> Back to Dashboard
          </button>
        </div>
        
        <div className="admin-header">
          <div className="header-left">
            <div className="header-icon">
              <FaBoxOpen />
            </div>
            <div className="header-text">
              <h1>Product Catalog</h1>
              <p>Manage your inventory, pricing, and product details</p>
            </div>
          </div>
          <button 
            className="btn-primary"
            onClick={() => navigate('/admin/products/new')}
          >
            <FaPlus /> Add New Product
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon purple">
            <FaCube />
          </div>
          <div className="stat-info">
            <h3>{products.length}</h3>
            <p>Total Products</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">
            <FaTag />
          </div>
          <div className="stat-info">
            <h3>{products.filter(p => p.stock_quantity > 0).length}</h3>
            <p>In Stock</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange">
            <FaExclamationTriangle />
          </div>
          <div className="stat-info">
            <h3>{products.filter(p => p.stock_quantity < 10 && p.stock_quantity > 0).length}</h3>
            <p>Low Stock Alert</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon blue">
            <FaDollarSign />
          </div>
          <div className="stat-info">
            <h3>KSh {products.reduce((sum, p) => sum + (p.price || 0), 0).toLocaleString()}</h3>
            <p>Total Inventory Value</p>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="filters-bar">
        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Search by product name or SKU..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="filter-group">
          <select 
            className="filter-select"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Modern Product Grid */}
      <div className="products-grid">
        {currentProducts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <FaRegImages />
            </div>
            <h3>No products found</h3>
            <p>Try adjusting your search or add a new product</p>
            <button 
              className="btn-outline"
              onClick={() => navigate('/admin/products/new')}
            >
              <FaPlus /> Add Product
            </button>
          </div>
        ) : (
          currentProducts.map(product => (
            <div className="product-card" key={product.id}>
              <div className="product-image-container">
                {product.images && product.images[0] ? (
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="product-image"
                  />
                ) : (
                  <div className="product-image-placeholder">
                    <FaCloudUploadAlt />
                    <span>No Image</span>
                  </div>
                )}
                <div className="product-actions-overlay">
                  <button 
                    className="action-btn edit"
                    onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                    title="Edit product"
                  >
                    <FaEdit />
                  </button>
                  <button 
                    className="action-btn delete"
                    onClick={() => {
                      setProductToDelete(product);
                      setShowDeleteModal(true);
                    }}
                    title="Delete product"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              <div className="product-info">
                <div className="product-sku">{product.sku}</div>
                <h4 className="product-name">{product.name}</h4>
                <div className="product-price">KSh {product.price?.toLocaleString()}</div>
                <div className="product-footer">
                  <span className={`stock-badge ${getStockStatusClass(product.stock_quantity)}`}>
                    {getStockStatusText(product.stock_quantity)}
                    {product.stock_quantity < 10 && product.stock_quantity > 0 && (
                      <FaExclamationTriangle className="warning-icon" />
                    )}
                  </span>
                  <span className="stock-quantity">{product.stock_quantity} units</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {filteredProducts.length > itemsPerPage && (
        <div className="pagination">
          <button 
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="page-btn"
          >
            <FaChevronLeft />
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`page-btn ${currentPage === index + 1 ? 'active' : ''}`}
            >
              {index + 1}
            </button>
          ))}
          <button 
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="page-btn"
          >
            <FaChevronRight />
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <FaExclamationTriangle className="modal-warning-icon" />
              <h3>Delete Product</h3>
              <button className="modal-close" onClick={() => setShowDeleteModal(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete <strong>"{productToDelete?.name}"</strong>?</p>
              <p className="modal-warning">This action cannot be undone. All product data will be permanently removed.</p>
            </div>
            <div className="modal-actions">
              <button 
                className="btn-secondary" 
                onClick={() => setShowDeleteModal(false)}
                disabled={deleteLoading}
              >
                Cancel
              </button>
              <button 
                className="btn-danger" 
                onClick={handleDelete}
                disabled={deleteLoading}
              >
                {deleteLoading ? <FaSpinner className="spin" /> : 'Delete Product'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;