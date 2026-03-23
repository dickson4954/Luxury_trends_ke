import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './AdminProductForm.css';
import { 
  FaSave, FaTimes, FaSpinner, FaImage, FaTrash, 
  FaUpload, FaArrowLeft, FaTag, FaBox, FaDollarSign,
  FaLayerGroup, FaAlignLeft, FaEye, FaEyeSlash,
  FaCloudUploadAlt, FaPlus, FaCheckCircle, FaExclamationCircle,
  FaBarcode, FaShoppingCart, FaPhotoVideo, FaRegImages,
  FaSync, FaInfoCircle  // Added missing icons
} from 'react-icons/fa';

const AdminProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState([]);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [existingImages, setExistingImages] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category_id: '',
    price: '',
    stock_quantity: '0',
    description: '',
    status: 'draft'
  });

  const [formErrors, setFormErrors] = useState({});

  // Fetch categories function
  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/categories/');
      const data = await response.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Fetch product function
  const fetchProduct = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.product) {
        setFormData({
          name: data.product.name || '',
          sku: data.product.sku || '',
          category_id: data.product.category_id || '',
          price: data.product.price || '',
          stock_quantity: data.product.stock_quantity || '0',
          description: data.product.description || '',
          status: data.product.status || 'draft'
        });
        setExistingImages(data.product.images || []);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      alert('Failed to load product');
      navigate('/admin/products');
    } finally {
      setLoading(false);
    }
  };

  // Generate SKU automatically based on product name and category
  const generateSKU = () => {
    if (!formData.name || !formData.category_id) return '';
    
    // Get category name
    const category = categories.find(cat => cat.id === parseInt(formData.category_id));
    const categoryCode = category ? category.name.substring(0, 3).toUpperCase() : 'PRD';
    
    // Generate product code from name (first 3 letters + random numbers)
    const productCode = formData.name
      .replace(/[^a-zA-Z0-9]/g, '')
      .substring(0, 3)
      .toUpperCase();
    
    // Removed unused randomNum variable
    const timestamp = Date.now().toString().slice(-4);
    
    return `${categoryCode}-${productCode}-${timestamp}`;
  };

  useEffect(() => {
    fetchCategories();
    if (id) {
      fetchProduct();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Auto-generate SKU when name or category changes
  useEffect(() => {
    // Only auto-generate SKU if it's empty or if we're creating a new product
    if (!id && !formData.sku && formData.name && formData.category_id) {
      const newSKU = generateSKU();
      if (newSKU) {
        setFormData(prev => ({ ...prev, sku: newSKU }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.name, formData.category_id, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleGenerateSKU = () => {
    const newSKU = generateSKU();
    if (newSKU) {
      setFormData(prev => ({ ...prev, sku: newSKU }));
    } else {
      alert('Please select a category and enter a product name first');
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Product name is required';
    if (!formData.category_id) errors.category_id = 'Please select a category';
    if (!formData.price || parseFloat(formData.price) <= 0) errors.price = 'Valid price is required';
    if (formData.stock_quantity < 0) errors.stock_quantity = 'Stock cannot be negative';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleImageUpload = async (files) => {
    if (!files || files.length === 0) return;
    
    setUploadingImages(true);
    const uploadedImages = [];
    
    for (const file of files) {
      if (!file.type.startsWith('image/')) continue;
      
      // For demo: create local preview URLs
      // In production, you would upload to your backend
      const previewUrl = URL.createObjectURL(file);
      uploadedImages.push({
        id: `temp_${Date.now()}_${Math.random()}`,
        url: previewUrl,
        file: file,
        isNew: true
      });
    }
    
    setExistingImages(prev => [...prev, ...uploadedImages]);
    setUploadingImages(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const files = Array.from(e.dataTransfer.files);
    handleImageUpload(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const removeImage = (imageToRemove) => {
    if (imageToRemove.isNew && imageToRemove.url) {
      URL.revokeObjectURL(imageToRemove.url);
    }
    if (!imageToRemove.isNew && imageToRemove.id) {
      setImagesToDelete(prev => [...prev, imageToRemove.id]);
    }
    setExistingImages(prev => prev.filter(img => img.id !== imageToRemove.id && img.url !== imageToRemove.url));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Scroll to first error
      const firstError = document.querySelector('.form-group.error');
      if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    
    setSaving(true);
    
    try {
      const token = localStorage.getItem('token');
      const url = id 
        ? `http://localhost:5000/api/admin/products/${id}`
        : 'http://localhost:5000/api/admin/products/';
      
      const method = id ? 'PUT' : 'POST';
      
      // Prepare data for submission
      const submitData = {
        ...formData,
        price: parseFloat(formData.price),
        stock_quantity: parseInt(formData.stock_quantity),
        // In production, you would upload images here via FormData
        images_to_delete: imagesToDelete,
        new_images: existingImages.filter(img => img.isNew).map(img => img.file)
      };
      
      // For demo, we'll use JSON
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(submitData)
      });
      
      const data = await response.json();
      if (data.success) {
        // Clean up object URLs
        existingImages.forEach(img => {
          if (img.isNew && img.url) URL.revokeObjectURL(img.url);
        });
        alert(id ? 'Product updated successfully!' : 'Product created successfully!');
        navigate('/admin/products');
      } else {
        alert(data.message || 'Failed to save product');
      }
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-container">
          <FaSpinner className="spinner" />
          <p>Loading product details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-product-form">
      {/* Header with Navigation - FIXED ALIGNMENT */}
      <div className="form-header-modern">
        <div className="header-left">
          <button className="back-button" onClick={() => navigate('/admin/products')}>
            <FaArrowLeft />
            <span>Back to Products</span>
          </button>
          <div className="header-title">
            <div className="title-icon">
              {id ? <FaBox /> : <FaPlus />}
            </div>
            <div>
              <h1>{id ? 'Edit Product' : 'Create New Product'}</h1>
              <p>{id ? 'Update product details and images' : 'Add a new product to your catalog'}</p>
            </div>
          </div>
        </div>
        <div className="header-actions">
          <button 
            type="button" 
            className="btn-secondary-modern" 
            onClick={() => navigate('/admin/products')}
          >
            <FaTimes /> Cancel
          </button>
          <button 
            type="button" 
            className="btn-primary-modern" 
            onClick={handleSubmit}
            disabled={saving}
          >
            {saving ? <FaSpinner className="spin" /> : <FaSave />}
            {saving ? 'Saving...' : (id ? 'Update Product' : 'Create Product')}
          </button>
        </div>
      </div>

      {/* Two-Column Layout */}
      <div className="form-container-modern">
        <form onSubmit={handleSubmit} className="product-form-modern">
          {/* Left Column - Main Info */}
          <div className="form-left-column">
            <div className="form-section">
              <div className="section-header">
                <FaTag className="section-icon" />
                <h3>Basic Information</h3>
                <span className="section-badge">Required</span>
              </div>
              
              <div className="form-row">
                <div className={`form-group-modern ${formErrors.name ? 'error' : ''}`}>
                  <label>
                    Product Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., Wireless Headphones Pro"
                    className="modern-input"
                  />
                  {formErrors.name && (
                    <div className="error-message">
                      <FaExclamationCircle /> {formErrors.name}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-row two-columns">
                <div className={`form-group-modern ${formErrors.sku ? 'error' : ''}`}>
                  <label>
                    <FaBarcode /> SKU
                  </label>
                  <div className="sku-input-wrapper">
                    <input
                      type="text"
                      name="sku"
                      value={formData.sku}
                      onChange={handleChange}
                      placeholder="Auto-generated if empty"
                      className="modern-input with-sku-button"
                    />
                    <button 
                      type="button"
                      className="generate-sku-btn"
                      onClick={handleGenerateSKU}
                      disabled={!formData.category_id || !formData.name}
                      title={!formData.category_id || !formData.name ? "Select category and enter product name first" : "Generate SKU"}
                    >
                      <FaSync /> Generate
                    </button>
                  </div>
                  <div className="sku-hint">
                    <FaInfoCircle /> SKU will be auto-generated when you select a category and enter a product name
                  </div>
                </div>

                <div className={`form-group-modern ${formErrors.category_id ? 'error' : ''}`}>
                  <label>
                    <FaLayerGroup /> Category <span className="required">*</span>
                  </label>
                  <select
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleChange}
                    className="modern-select"
                  >
                    <option value="">Select a category</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                  {formErrors.category_id && (
                    <div className="error-message">
                      <FaExclamationCircle /> {formErrors.category_id}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-row two-columns">
                <div className={`form-group-modern ${formErrors.price ? 'error' : ''}`}>
                  <label>
                    <FaDollarSign /> Price <span className="required">*</span>
                  </label>
                  <div className="price-input-wrapper">
                    <span className="currency-symbol">KSh</span>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      className="modern-input with-symbol"
                    />
                  </div>
                  {formErrors.price && (
                    <div className="error-message">
                      <FaExclamationCircle /> {formErrors.price}
                    </div>
                  )}
                </div>

                <div className={`form-group-modern ${formErrors.stock_quantity ? 'error' : ''}`}>
                  <label>
                    <FaShoppingCart /> Stock Quantity
                  </label>
                  <input
                    type="number"
                    name="stock_quantity"
                    value={formData.stock_quantity}
                    onChange={handleChange}
                    min="0"
                    className="modern-input"
                  />
                  {parseInt(formData.stock_quantity) < 10 && parseInt(formData.stock_quantity) > 0 && (
                    <div className="warning-message">
                      <FaExclamationCircle /> Low stock warning
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="section-header">
                <FaAlignLeft className="section-icon" />
                <h3>Description</h3>
              </div>
              
              <div className="form-group-modern">
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="6"
                  placeholder="Describe your product in detail... Features, specifications, benefits, etc."
                  className="modern-textarea"
                />
                <div className="textarea-hint">
                  <FaAlignLeft /> Markdown supported • {formData.description.length} characters
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="section-header">
                <FaEye className="section-icon" />
                <h3>Visibility Status</h3>
              </div>
              
              <div className="status-options">
                <label className={`status-option ${formData.status === 'draft' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="status"
                    value="draft"
                    checked={formData.status === 'draft'}
                    onChange={handleChange}
                  />
                  <div className="status-content">
                    <FaEyeSlash className="status-icon draft" />
                    <div>
                      <strong>Draft</strong>
                      <span>Hidden from storefront</span>
                    </div>
                  </div>
                </label>
                
                <label className={`status-option ${formData.status === 'active' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="status"
                    value="active"
                    checked={formData.status === 'active'}
                    onChange={handleChange}
                  />
                  <div className="status-content">
                    <FaEye className="status-icon active" />
                    <div>
                      <strong>Active</strong>
                      <span>Visible to customers</span>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column - Images Section */}
          <div className="form-right-column">
            <div className="form-section images-section">
              <div className="section-header">
                <FaPhotoVideo className="section-icon" />
                <h3>Product Images</h3>
                <span className="section-badge">{existingImages.length} images</span>
              </div>
              
              {/* Image Upload Area */}
              <div 
                className={`image-upload-area ${dragActive ? 'drag-active' : ''}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleImageUpload(Array.from(e.target.files))}
                  style={{ display: 'none' }}
                />
                <div className="upload-content">
                  <FaCloudUploadAlt className="upload-icon" />
                  <div className="upload-text">
                    <strong>Drop images here or click to upload</strong>
                    <span>PNG, JPG, WEBP up to 5MB each</span>
                  </div>
                  <button type="button" className="upload-button">
                    <FaUpload /> Choose Files
                  </button>
                </div>
                {uploadingImages && (
                  <div className="uploading-overlay">
                    <FaSpinner className="spin" />
                    <span>Uploading images...</span>
                  </div>
                )}
              </div>

              {/* Image Gallery */}
              {existingImages.length > 0 && (
                <div className="image-gallery">
                  <div className="gallery-header">
                    <FaRegImages />
                    <span>Image Gallery</span>
                  </div>
                  <div className="gallery-grid">
                    {existingImages.map((image, index) => (
                      <div key={image.id || index} className="gallery-item">
                        <img 
                          src={image.url} 
                          alt={`Product ${index + 1}`}
                          className="gallery-image"
                        />
                        <div className="gallery-item-overlay">
                          {index === 0 && (
                            <span className="primary-badge">Primary</span>
                          )}
                          <button 
                            type="button"
                            className="remove-image-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeImage(image);
                            }}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    ))}
                    {existingImages.length < 8 && (
                      <div 
                        className="gallery-item add-more"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <FaPlus />
                        <span>Add More</span>
                      </div>
                    )}
                  </div>
                  <div className="gallery-hint">
                    <FaImage /> First image will be used as the main product thumbnail
                  </div>
                </div>
              )}

              {/* Image Guidelines */}
              <div className="image-guidelines">
                <div className="guideline-item">
                  <FaCheckCircle className="guideline-icon success" />
                  <span>Recommended: 1200 x 1200 pixels (square)</span>
                </div>
                <div className="guideline-item">
                  <FaCheckCircle className="guideline-icon info" />
                  <span>Maximum 8 images per product</span>
                </div>
                <div className="guideline-item">
                  <FaCheckCircle className="guideline-icon info" />
                  <span>Supported formats: PNG, JPG, WEBP</span>
                </div>
              </div>
            </div>

            {/* Quick Preview Section */}
            {formData.name && (
              <div className="form-section preview-section">
                <div className="section-header">
                  <FaEye className="section-icon" />
                  <h3>Live Preview</h3>
                </div>
                <div className="product-preview">
                  <div className="preview-image">
                    {existingImages[0] ? (
                      <img src={existingImages[0].url} alt="Preview" />
                    ) : (
                      <div className="preview-placeholder">
                        <FaImage />
                      </div>
                    )}
                  </div>
                  <div className="preview-details">
                    <h4>{formData.name || 'Product Name'}</h4>
                    <div className="preview-price">KSh {formData.price || '0.00'}</div>
                    <div className="preview-sku">SKU: {formData.sku || 'Auto-generated'}</div>
                    <div className={`preview-status ${formData.status}`}>
                      {formData.status === 'active' ? 'Available' : 'Draft Mode'}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProductForm;