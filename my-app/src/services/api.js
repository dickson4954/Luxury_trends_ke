const API_URL = 'http://localhost:5000/api';

// Helper to get auth token
const getToken = () => localStorage.getItem('token');

// Helper for headers
const getHeaders = (includeAuth = true) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  
  if (includeAuth) {
    const token = getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  
  return headers;
};

// Handle response
const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  return data;
};

// API functions
export const api = {
  // Auth endpoints
  auth: {
    login: (credentials) => 
      fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: getHeaders(false),
        body: JSON.stringify(credentials)
      }).then(handleResponse),
    
    register: (userData) =>
      fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: getHeaders(false),
        body: JSON.stringify(userData)
      }).then(handleResponse),
  },

  // Products endpoints
  products: {
    getAll: (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      return fetch(`${API_URL}/products/?${queryString}`, {
        headers: getHeaders(false)
      }).then(handleResponse);
    },
    
    getByCategory: (categoryId) =>
      fetch(`${API_URL}/products/category/${categoryId}`, {
        headers: getHeaders(false)
      }).then(handleResponse),
    
    getOne: (id) =>
      fetch(`${API_URL}/products/${id}`, {
        headers: getHeaders(false)
      }).then(handleResponse),
  },

  // Categories endpoints
  categories: {
    getAll: () =>
      fetch(`${API_URL}/categories/`, {
        headers: getHeaders(false)
      }).then(handleResponse),
    
    getOne: (slug) =>
      fetch(`${API_URL}/categories/${slug}`, {
        headers: getHeaders(false)
      }).then(handleResponse),
  },

  // Orders endpoints
  orders: {
    create: (orderData) =>
      fetch(`${API_URL}/orders/`, {
        method: 'POST',
        headers: getHeaders(true),
        body: JSON.stringify(orderData)
      }).then(handleResponse),
  },

  // Admin endpoints
  admin: {
    getStats: () =>
      fetch(`${API_URL}/admin/stats`, {
        headers: getHeaders(true)
      }).then(handleResponse),
    
    getProducts: () =>
      fetch(`${API_URL}/admin/products`, {
        headers: getHeaders(true)
      }).then(handleResponse),
    
    getLowStock: () =>
      fetch(`${API_URL}/admin/products/low-stock`, {
        headers: getHeaders(true)
      }).then(handleResponse),
    
    getRecentOrders: () =>
      fetch(`${API_URL}/admin/recent-orders`, {
        headers: getHeaders(true)
      }).then(handleResponse),
    
    getRecentCustomers: () =>
      fetch(`${API_URL}/admin/recent-customers`, {
        headers: getHeaders(true)
      }).then(handleResponse),
    
    createProduct: (productData) =>
      fetch(`${API_URL}/admin/products/`, {
        method: 'POST',
        headers: getHeaders(true),
        body: JSON.stringify(productData)
      }).then(handleResponse),
    
    updateProduct: (id, productData) =>
      fetch(`${API_URL}/admin/products/${id}`, {
        method: 'PUT',
        headers: getHeaders(true),
        body: JSON.stringify(productData)
      }).then(handleResponse),
    
    deleteProduct: (id) =>
      fetch(`${API_URL}/admin/products/${id}`, {
        method: 'DELETE',
        headers: getHeaders(true)
      }).then(handleResponse),
  },
};

export default api;
