import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminCategories.css';
import { 
  FaPlus, FaEdit, FaTrash, FaSearch, 
  FaSpinner, FaExclamationTriangle, FaLayerGroup,
  FaChevronLeft, FaChevronRight, FaTimes,
  FaTag, FaBoxes, FaImage, FaCheckCircle,
  FaSave, FaTimesCircle, FaFolderOpen
} from 'react-icons/fa';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    description: '',
    image_url: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/categories/');
      const data = await response.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCategory = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const url = editingCategory 
        ? `http://localhost:5000/api/admin/categories/${editingCategory.id}`
        : 'http://localhost:5000/api/admin/categories/';
      
      const method = editingCategory ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(categoryForm)
      });
      
      const data = await response.json();
      if (data.success || data.category) {
        fetchCategories();
        setShowCategoryModal(false);
        setEditingCategory(null);
        setCategoryForm({ name: '', description: '', image_url: '' });
      } else {
        alert(data.message || 'Failed to save category');
      }
    } catch (error) {
      console.error('Error saving category:', error);
      alert('Failed to save category');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!categoryToDelete) return;
    
    setDeleteLoading(true);
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:5000/api/admin/categories/${categoryToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setCategories(categories.filter(c => c.id !== categoryToDelete.id));
      setShowDeleteModal(false);
      setCategoryToDelete(null);
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Failed to delete category');
    } finally {
      setDeleteLoading(false);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!categoryForm.name.trim()) errors.name = 'Category name is required';
    if (categoryForm.name.length < 2) errors.name = 'Name must be at least 2 characters';
    if (categoryForm.name.length > 50) errors.name = 'Name must be less than 50 characters';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setCategoryForm({
      name: category.name,
      description: category.description || '',
      image_url: category.image_url || ''
    });
    setShowCategoryModal(true);
  };

  const filteredCategories = categories.filter(category => 
    category.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCategories = filteredCategories.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner-container">
          <FaSpinner className="spinner" />
          <p>Loading categories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-categories">
      {/* Header */}
      <div className="categories-header">
        <div className="header-left">
          <div className="header-icon">
            <FaLayerGroup />
          </div>
          <div className="header-text">
            <h1>Categories Management</h1>
            <p>Organize your products with custom categories</p>
          </div>
        </div>
        <button 
          className="btn-primary"
          onClick={() => {
            setEditingCategory(null);
            setCategoryForm({ name: '', description: '', image_url: '' });
            setShowCategoryModal(true);
          }}
        >
          <FaPlus /> Add New Category
        </button>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid-categories">
        <div className="stat-card">
          <div className="stat-icon purple">
            <FaFolderOpen />
          </div>
          <div className="stat-info">
            <h3>{categories.length}</h3>
            <p>Total Categories</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">
            <FaTag />
          </div>
          <div className="stat-info">
            <h3>{categories.filter(c => c.products_count > 0).length}</h3>
            <p>With Products</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon blue">
            <FaBoxes />
          </div>
          <div className="stat-info">
            <h3>{categories.reduce((sum, c) => sum + (c.products_count || 0), 0)}</h3>
            <p>Total Products</p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="search-bar-categories">
        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Search categories by name or description..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="categories-grid">
        {currentCategories.length === 0 ? (
          <div className="empty-state-categories">
            <div className="empty-icon">
              <FaFolderOpen />
            </div>
            <h3>No categories found</h3>
            <p>{searchTerm ? 'Try adjusting your search' : 'Create your first category to organize products'}</p>
            {!searchTerm && (
              <button 
                className="btn-outline"
                onClick={() => {
                  setEditingCategory(null);
                  setCategoryForm({ name: '', description: '', image_url: '' });
                  setShowCategoryModal(true);
                }}
              >
                <FaPlus /> Add Category
              </button>
            )}
          </div>
        ) : (
          currentCategories.map(category => (
            <div className="category-card" key={category.id}>
              <div className="category-image-container">
                {category.image_url ? (
                  <img 
                    src={category.image_url} 
                    alt={category.name}
                    className="category-image"
                  />
                ) : (
                  <div className="category-image-placeholder">
                    <FaLayerGroup />
                  </div>
                )}
                <div className="category-actions-overlay">
                  <button 
                    className="action-btn edit"
                    onClick={() => handleEdit(category)}
                    title="Edit category"
                  >
                    <FaEdit />
                  </button>
                  <button 
                    className="action-btn delete"
                    onClick={() => {
                      setCategoryToDelete(category);
                      setShowDeleteModal(true);
                    }}
                    title="Delete category"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              <div className="category-info">
                <h4 className="category-name">{category.name}</h4>
                {category.description && (
                  <p className="category-description">{category.description}</p>
                )}
                <div className="category-stats">
                  <FaBoxes className="stats-icon" />
                  <span>{category.products_count || 0} products</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
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

      {/* Category Modal (Add/Edit) */}
      {showCategoryModal && (
        <div className="modal-overlay" onClick={() => setShowCategoryModal(false)}>
          <div className="category-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingCategory ? 'Edit Category' : 'Add New Category'}</h3>
              <button className="modal-close" onClick={() => setShowCategoryModal(false)}>
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleSaveCategory}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Category Name *</label>
                  <input
                    type="text"
                    value={categoryForm.name}
                    onChange={(e) => setCategoryForm({...categoryForm, name: e.target.value})}
                    placeholder="e.g., Fans, Garden Lights, Switches"
                    className={formErrors.name ? 'error' : ''}
                  />
                  {formErrors.name && <span className="error-message">{formErrors.name}</span>}
                </div>
                
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={categoryForm.description}
                    onChange={(e) => setCategoryForm({...categoryForm, description: e.target.value})}
                    placeholder="Describe what products belong in this category"
                    rows="3"
                  />
                </div>
                
                <div className="form-group">
                  <label>Image URL (optional)</label>
                  <input
                    type="text"
                    value={categoryForm.image_url}
                    onChange={(e) => setCategoryForm({...categoryForm, image_url: e.target.value})}
                    placeholder="https://example.com/category-image.jpg"
                  />
                  <small>Add a representative image for this category</small>
                </div>
              </div>
              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn-secondary" 
                  onClick={() => setShowCategoryModal(false)}
                >
                  <FaTimesCircle /> Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-primary"
                  disabled={saving}
                >
                  {saving ? <FaSpinner className="spin" /> : <FaSave />}
                  {saving ? 'Saving...' : (editingCategory ? 'Update Category' : 'Create Category')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <FaExclamationTriangle className="modal-warning-icon" />
              <h3>Delete Category</h3>
              <button className="modal-close" onClick={() => setShowDeleteModal(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete <strong>"{categoryToDelete?.name}"</strong>?</p>
              {categoryToDelete?.products_count > 0 && (
                <p className="modal-warning warning">
                  <FaExclamationTriangle /> This category has {categoryToDelete.products_count} products. 
                  They will need to be reassigned to another category.
                </p>
              )}
              <p className="modal-warning">This action cannot be undone.</p>
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
                {deleteLoading ? <FaSpinner className="spin" /> : 'Delete Category'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategories;