import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaEye, FaSearch, FaFilter, FaSort, FaBox, FaUsers, FaShoppingCart, FaChartLine } from 'react-icons/fa';
import axios from 'axios';

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('products');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '',
    stockQuantity: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productsRes, usersRes, ordersRes] = await Promise.all([
        axios.get('http://localhost:8081/api/products'),
        axios.get('http://localhost:8081/api/users'),
        axios.get('http://localhost:8081/api/orders')
      ]);

      setProducts(productsRes.data);
      setUsers(usersRes.data);
      setOrders(ordersRes.data);
    } catch (err) {
      setError('Failed to fetch data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8081/api/products', newProduct);
      setNewProduct({
        name: '',
        description: '',
        price: '',
        category: '',
        imageUrl: '',
        stockQuantity: ''
      });
      setShowAddProduct(false);
      fetchData();
    } catch (err) {
      console.error('Failed to add product:', err);
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8081/api/products/${editingProduct.id}`, editingProduct);
      setEditingProduct(null);
      fetchData();
    } catch (err) {
      console.error('Failed to update product:', err);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:8081/api/products/${id}`);
        fetchData();
      } catch (err) {
        console.error('Failed to delete product:', err);
      }
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(products.map(p => p.category))];

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading admin dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-content">
          <h2>Error Loading Dashboard</h2>
          <p>{error}</p>
          <button className="retry-button" onClick={fetchData}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="container">
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <p>Manage your grocery store operations</p>
        </div>

        <div className="admin-stats">
          <div className="stat-card">
            <div className="stat-icon">
              <FaBox />
            </div>
            <div className="stat-content">
              <h3>{products.length}</h3>
              <p>Total Products</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FaUsers />
            </div>
            <div className="stat-content">
              <h3>{users.length}</h3>
              <p>Total Users</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FaShoppingCart />
            </div>
            <div className="stat-content">
              <h3>{orders.length}</h3>
              <p>Total Orders</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FaChartLine />
            </div>
            <div className="stat-content">
              <h3>₹{orders.reduce((sum, order) => sum + order.totalAmount, 0).toFixed(2)}</h3>
              <p>Total Revenue</p>
            </div>
          </div>
        </div>

        <div className="admin-tabs">
          <button
            className={`tab-button ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            Products
          </button>
          <button
            className={`tab-button ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            Users
          </button>
          <button
            className={`tab-button ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            Orders
          </button>
        </div>

        {activeTab === 'products' && (
          <div className="tab-content">
            <div className="content-header">
              <div className="header-controls">
                <div className="search-box">
                  <FaSearch className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                </div>
                <div className="filter-box">
                  <FaFilter className="filter-icon" />
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="category-select"
                  >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                className="add-button"
                onClick={() => setShowAddProduct(true)}
              >
                <FaPlus /> Add Product
              </button>
            </div>

            <div className="products-table">
              <table>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map(product => (
                    <tr key={product.id}>
                      <td>
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="product-thumbnail"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/40x40?text=No+Image';
                            e.target.onerror = null;
                          }}
                        />
                      </td>
                      <td>{product.name}</td>
                      <td>
                        <span className="category-tag">{product.category}</span>
                      </td>
                      <td>₹{product.price}</td>
                      <td>
                        <span className={`stock-badge ${product.stockQuantity > 0 ? 'in-stock' : 'out-of-stock'}`}>
                          {product.stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="action-btn edit"
                            onClick={() => setEditingProduct(product)}
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="action-btn delete"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="tab-content">
            <div className="content-header">
              <h3>User Management</h3>
            </div>
            <div className="users-table">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`role-badge ${user.role === 'ADMIN' ? 'admin' : 'user'}`}>
                          {user.role}
                        </span>
                      </td>
                      <td>
                        <button className="action-btn view">
                          <FaEye />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="tab-content">
            <div className="content-header">
              <h3>Order Management</h3>
            </div>
            <div className="orders-table">
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id}>
                      <td>#{order.id}</td>
                      <td>{order.user?.name || 'Unknown'}</td>
                      <td>₹{order.totalAmount}</td>
                      <td>
                        <span className={`status-badge ${order.status.toLowerCase()}`}>
                          {order.status}
                        </span>
                      </td>
                      <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                      <td>
                        <button className="action-btn view">
                          <FaEye />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {showAddProduct && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Add New Product</h3>
              <button
                className="close-button"
                onClick={() => setShowAddProduct(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleAddProduct} className="modal-form">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Price</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Stock Quantity</label>
                  <input
                    type="number"
                    value={newProduct.stockQuantity}
                    onChange={(e) => setNewProduct({...newProduct, stockQuantity: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Dairy">Dairy</option>
                    <option value="Bakery">Bakery</option>
                    <option value="Beverages">Beverages</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Image URL</label>
                  <input
                    type="url"
                    value={newProduct.imageUrl}
                    onChange={(e) => setNewProduct({...newProduct, imageUrl: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-button" onClick={() => setShowAddProduct(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-button">
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Edit Product</h3>
              <button
                className="close-button"
                onClick={() => setEditingProduct(null)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleUpdateProduct} className="modal-form">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Price</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({...editingProduct, price: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Stock Quantity</label>
                  <input
                    type="number"
                    value={editingProduct.stockQuantity}
                    onChange={(e) => setEditingProduct({...editingProduct, stockQuantity: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}
                    required
                  >
                    <option value="Fruits">Fruits</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Dairy">Dairy</option>
                    <option value="Bakery">Bakery</option>
                    <option value="Beverages">Beverages</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Image URL</label>
                  <input
                    type="url"
                    value={editingProduct.imageUrl}
                    onChange={(e) => setEditingProduct({...editingProduct, imageUrl: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-button" onClick={() => setEditingProduct(null)}>
                  Cancel
                </button>
                <button type="submit" className="submit-button">
                  Update Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;






