import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { FaSearch, FaFilter, FaShoppingCart, FaCheck, FaStar, FaTruck, FaClock } from 'react-icons/fa'

const Products = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [quickAddQuantities, setQuickAddQuantities] = useState({})

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    const category = searchParams.get('category')
    if (category) {
      setSelectedCategory(category)
    }
  }, [searchParams])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await axios.get('http://localhost:8081/api/products')
      setProducts(response.data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch products')
      console.error('Error fetching products:', err)
    } finally {
      setLoading(false)
    }
  }

  const showToastMessage = (message) => {
    setToastMessage(message)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const handleAddToCart = (product, quantity = 1) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        ...product,
        quantity: quantity
      });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count in navbar
    window.dispatchEvent(new Event('storage'));
    
    showToastMessage(`${product.name} (${quantity}x) added to cart!`);
  }

  const handleQuickAddToCart = (product) => {
    const quantity = quickAddQuantities[product.id] || 1;
    handleAddToCart(product, quantity);
    // Reset quantity after adding
    setQuickAddQuantities(prev => ({ ...prev, [product.id]: 1 }));
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = !selectedCategory || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = [...new Set(products.map(product => product.category))]

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading fresh products...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-content">
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button onClick={fetchProducts} className="retry-button">Try Again</button>
        </div>
      </div>
    )
  }

  return (
    <div className="products-page">
      {/* Toast Notification */}
      {showToast && (
        <div className="toast-notification">
          <FaCheck className="toast-icon" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="container">
        <div className="products-header">
          <div className="header-content">
            <h1>Fresh Groceries</h1>
            <p>Handpicked quality products delivered to your doorstep</p>
          </div>
          
          <div className="header-features">
            <div className="feature-item">
              <FaTruck className="feature-icon" />
              <span>10 Min Delivery</span>
            </div>
            <div className="feature-item">
              <FaStar className="feature-icon" />
              <span>Quality Assured</span>
            </div>
            <div className="feature-item">
              <FaClock className="feature-icon" />
              <span>24/7 Available</span>
            </div>
          </div>
        </div>

        <div className="products-controls">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search for fresh products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-box">
            <FaFilter className="filter-icon" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category-select"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="products-grid">
          {filteredProducts.length === 0 ? (
            <div className="no-products">
              <div className="no-products-content">
                <h3>No products found</h3>
                <p>Try adjusting your search or category filter</p>
                <button onClick={() => {setSearchTerm(''); setSelectedCategory('')}} className="clear-filters-button">
                  Clear Filters
                </button>
              </div>
            </div>
          ) : (
            filteredProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                      e.target.onerror = null;
                    }}
                  />
                  <div className="product-badge">
                    {product.available ? 'In Stock' : 'Out of Stock'}
                  </div>
                </div>
                <div className="product-info">
                  <div className="product-category-tag">{product.category}</div>
                  <h3 className="product-name">{product.name}</h3>
                  {product.description && (
                    <p className="product-description">{product.description}</p>
                  )}
                  <div className="product-price">₹{product.price}</div>
                  <div className="product-actions">
                    <Link to={`/product/${product.id}`} className="view-button">
                      View Details
                    </Link>
                    <div className="quick-add-section">
                      <select
                        value={quickAddQuantities[product.id] || 1}
                        onChange={(e) => setQuickAddQuantities(prev => ({
                          ...prev,
                          [product.id]: parseInt(e.target.value)
                        }))}
                        className="quantity-select"
                      >
                        {[1, 2, 3, 4, 5].map(num => (
                          <option key={num} value={num}>{num}</option>
                        ))}
                      </select>
                      <button 
                        className="add-to-cart-button"
                        onClick={() => handleQuickAddToCart(product)}
                        disabled={!product.available}
                      >
                        <FaShoppingCart /> Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Products
