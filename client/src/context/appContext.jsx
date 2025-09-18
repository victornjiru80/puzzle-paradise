import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

const API_BASE_URL = `${import.meta.env.VITE_SERVER_URL}/api`;

export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('adminToken'));

  // Fetch all products
  const fetchProducts = async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams();
      if (filters.type) queryParams.append('type', filters.type);
      if (filters.category) queryParams.append('category', filters.category);
      if (filters.pieces) queryParams.append('pieces', filters.pieces);

      const response = await fetch(`${API_BASE_URL}/products?${queryParams}`);
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.products);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  // Admin login
  const adminLogin = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setToken(data.token);
        setAdmin(data.admin);
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('isAdminAuthenticated', 'true');
        return { success: true, admin: data.admin };
      } else {
        setError(data.message);
        return { success: false, message: data.message };
      }
    } catch (err) {
      const errorMsg = 'Failed to login';
      setError(errorMsg);
      return { success: false, message: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Admin logout
  const adminLogout = () => {
    setToken(null);
    setAdmin(null);
    localStorage.removeItem('adminToken');
    localStorage.removeItem('isAdminAuthenticated');
  };

  // Verify admin token
  const verifyAdmin = async () => {
    if (!token) return false;
    
    try {
      const response = await fetch(`${API_BASE_URL}/admin/verify`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      const data = await response.json();
      
      if (data.success) {
        setAdmin(data.admin);
        return true;
      } else {
        adminLogout();
        return false;
      }
    } catch (err) {
      adminLogout();
      return false;
    }
  };

  // Create product
  const createProduct = async (productData) => {
    setLoading(true);
    setError(null);
    try {
      // Accept either plain object or prebuilt FormData
      const formData = productData instanceof FormData ? productData : (() => {
        const fd = new FormData();
        Object.keys(productData).forEach(key => {
          if (productData[key] !== undefined && productData[key] !== null) {
            fd.append(key, productData[key]);
          }
        });
        return fd;
      })();

      const response = await fetch(`${API_BASE_URL}/admin/products`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      
      const data = await response.json();
      
      if (data.success) {
        setProducts(prev => [data.product, ...prev]);
        // Refresh products to ensure all components get updated
        fetchProducts();
        return { success: true, product: data.product };
      } else {
        setError(data.message);
        return { success: false, message: data.message };
      }
    } catch (err) {
      const errorMsg = 'Failed to create product';
      setError(errorMsg);
      return { success: false, message: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Update product
  const updateProduct = async (productId, productData) => {
    setLoading(true);
    setError(null);
    try {
      // Accept either plain object or prebuilt FormData
      const formData = productData instanceof FormData ? productData : (() => {
        const fd = new FormData();
        Object.keys(productData).forEach(key => {
          if (productData[key] !== undefined && productData[key] !== null) {
            fd.append(key, productData[key]);
          }
        });
        return fd;
      })();

      const response = await fetch(`${API_BASE_URL}/admin/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      
      const data = await response.json();
      
      if (data.success) {
        setProducts(prev => prev.map(p => p._id === productId ? data.product : p));
        // Refresh products to ensure all components get updated
        fetchProducts();
        return { success: true, product: data.product };
      } else {
        setError(data.message);
        return { success: false, message: data.message };
      }
    } catch (err) {
      const errorMsg = 'Failed to update product';
      setError(errorMsg);
      return { success: false, message: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Delete product
  const deleteProduct = async (productId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/admin/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      const data = await response.json();
      
      if (data.success) {
        setProducts(prev => prev.filter(p => p._id !== productId));
        // Refresh products to ensure all components get updated
        fetchProducts();
        return { success: true };
      } else {
        setError(data.message);
        return { success: false, message: data.message };
      }
    } catch (err) {
      const errorMsg = 'Failed to delete product';
      setError(errorMsg);
      return { success: false, message: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Get ImageKit auth parameters
  const getImageKitAuth = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/imagekit-auth`);
      return await response.json();
    } catch (err) {
      console.error('Error getting ImageKit auth:', err);
      return null;
    }
  };

  // Initialize app
  useEffect(() => {
    if (token) {
      verifyAdmin();
    }
    fetchProducts();
  }, []);

  const value = {
    // State
    products,
    loading,
    error,
    admin,
    token,
    
    // Functions
    fetchProducts,
    adminLogin,
    adminLogout,
    verifyAdmin,
    createProduct,
    updateProduct,
    deleteProduct,
    getImageKitAuth,
    
    // Utils
    setError,
    setLoading
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};